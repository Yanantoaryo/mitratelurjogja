import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { groq } from "next-sanity";
import { getWriteClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diukur secara lokal: Opus 4.8 selesai dalam 56 detik, Fable 5 dalam 75 detik.
 * Fable 5 berpikir lebih lama dan pada tugas berat bisa berjalan beberapa menit.
 *
 * Batas ini hanya berlaku bila paket Vercel mengizinkannya. Paket Hobby
 * membatasi fungsi serverless di 60 detik, yang lebih pendek dari satu kali
 * jalan Fable 5 yang berhasil sekalipun.
 */
export const maxDuration = 300;

/** Brief aktif yang paling lama tidak dipakai; yang belum pernah dipakai didahulukan. */
const nextBriefQuery = groq`
  *[_type == "topicBrief" && active == true] | order(coalesce(lastUsedAt, "1970-01-01") asc)[0] {
    _id, title, topic, keywords,
    "categoryId": category._ref,
    "categoryTitle": category->title
  }
`;

interface TopicBrief {
  _id: string;
  title: string;
  topic: string;
  keywords?: string[];
  categoryId?: string;
  categoryTitle?: string;
}

/** Bentuk yang dipaksakan ke model. `additionalProperties: false` wajib. */
const ARTICLE_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    slug: {
      type: "string",
      description: "kebab-case, hanya a-z, 0-9, dan tanda hubung",
    },
    excerpt: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    body: {
      type: "array",
      items: {
        type: "object",
        properties: {
          kind: { type: "string", enum: ["heading", "paragraph", "bullet"] },
          text: { type: "string" },
        },
        required: ["kind", "text"],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "slug", "excerpt", "tags", "body"],
  additionalProperties: false,
} as const;

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  body: { kind: "heading" | "paragraph" | "bullet"; text: string }[];
}

const SYSTEM_PROMPT = `Kamu menulis artikel blog untuk Mitra Telur Jogja, supplier telur ayam komersial dan telur omega di Daerah Istimewa Yogyakarta.

Tulis dalam Bahasa Indonesia yang jelas dan lugas, untuk pembaca umum dan pemilik usaha kuliner.

Aturan:
- Jangan mengarang klaim medis, angka statistik, sertifikasi, atau penghargaan.
- Jangan menyebut harga spesifik. Harga berubah harian.
- Jangan menulis testimoni atau nama pelanggan.
- Tulis 5 sampai 9 blok isi. Mulai dengan satu paragraf pembuka sebelum heading pertama.
- Slug harus kebab-case dan diturunkan dari judul.`;

/** Bandingkan rahasia lewat digest berukuran tetap agar panjangnya tidak bocor lewat waktu eksekusi. */
function secretMatches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * Vercel Cron memanggil endpoint dengan GET dan mengirim rahasia sebagai
 * `Authorization: Bearer <CRON_SECRET>`. Header `x-cron-secret` disediakan
 * untuk pemanggilan manual lewat curl.
 */
function extractSecret(request: Request): string {
  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) return bearer.slice(7);
  return request.headers.get("x-cron-secret") ?? "";
}

let keyCounter = 0;
const nextKey = () => `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;

function toPortableText(blocks: GeneratedArticle["body"]) {
  return blocks.map((block) => ({
    _type: "block",
    _key: nextKey(),
    style: block.kind === "heading" ? "h2" : "normal",
    ...(block.kind === "bullet" && { listItem: "bullet", level: 1 }),
    markDefs: [],
    children: [
      { _type: "span", _key: nextKey(), text: block.text, marks: [] },
    ],
  }));
}

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}

async function handler(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!cronSecret) {
    console.error("generate-article: CRON_SECRET belum diset");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Endpoint ini menulis ke dataset dan memanggil API berbayar. Tanpa secret
  // yang cocok, tolak sebelum menyentuh keduanya.
  if (!secretMatches(extractSecret(request), cronSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!apiKey) {
    console.error("generate-article: ANTHROPIC_API_KEY belum diset");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let sanity: ReturnType<typeof getWriteClient>;
  try {
    sanity = getWriteClient();
  } catch {
    console.error("generate-article: SANITY_API_WRITE_TOKEN belum diset");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const brief = await sanity.fetch<TopicBrief | null>(nextBriefQuery);
  if (!brief) {
    return NextResponse.json(
      { error: "Tidak ada topicBrief aktif" },
      { status: 404 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  let generated: GeneratedArticle;
  try {
    const message = await anthropic.beta.messages.create({
      model: "claude-fable-5",
      max_tokens: 16000,
      // `thinking` sengaja tidak dikirim. Di Fable 5 thinking selalu menyala;
      // konfigurasi eksplisit selain adaptive ditolak 400. Kedalamannya
      // dikendalikan lewat output_config.effort.
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: ARTICLE_SCHEMA },
      },
      /**
       * Fable 5 menjalankan classifier keamanan yang kadang menolak permintaan
       * sah. Tanpa fallback, penolakan berarti cron gagal tanpa artikel.
       * Server menjalankan ulang request yang sama pada model pengganti dalam
       * satu panggilan; penolakan sebelum ada output tidak ditagih.
       */
      betas: ["server-side-fallback-2026-06-01"],
      fallbacks: [{ model: "claude-opus-4-8" }],
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            `Tulis satu artikel blog.`,
            `Topik: ${brief.topic}`,
            brief.keywords?.length
              ? `Kata kunci SEO yang relevan: ${brief.keywords.join(", ")}`
              : null,
            brief.categoryTitle ? `Kategori: ${brief.categoryTitle}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    });

    // Penolakan datang sebagai HTTP 200 dengan content kosong atau parsial.
    // Cek stop_reason sebelum membaca content, bukan sesudah.
    if (message.stop_reason === "refusal") {
      console.error(
        "generate-article: seluruh rantai model menolak",
        message.stop_details
      );
      return NextResponse.json({ error: "Permintaan ditolak" }, { status: 422 });
    }
    if (message.stop_reason === "max_tokens") {
      console.error("generate-article: output terpotong max_tokens");
      return NextResponse.json({ error: "Output terpotong" }, { status: 502 });
    }

    // Model pengganti ikut berjalan bila yang utama menolak. Dicatat agar
    // terlihat di log, bukan diam-diam.
    if (message.model !== "claude-fable-5") {
      console.warn(`generate-article: dilayani model pengganti ${message.model}`);
    }

    const text = message.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") {
      return NextResponse.json(
        { error: "Model tidak mengembalikan teks" },
        { status: 502 }
      );
    }
    generated = JSON.parse(text.text) as GeneratedArticle;
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("generate-article: ANTHROPIC_API_KEY ditolak");
      return NextResponse.json({ error: "Anthropic auth gagal" }, { status: 502 });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("generate-article: Anthropic API error", error.status);
      return NextResponse.json({ error: "Anthropic API error" }, { status: 502 });
    }
    console.error("generate-article: gagal parse output", error);
    return NextResponse.json({ error: "Output tidak valid" }, { status: 502 });
  }

  const slug = slugify(generated.slug || generated.title);
  if (!slug) {
    return NextResponse.json({ error: "Slug kosong" }, { status: 502 });
  }

  // Ditulis sebagai draft, bukan dokumen publik. Owner meninjau di Studio lalu
  // menekan Publish. Query artikel menyaring `drafts.**`, jadi ini tidak tampil.
  const draftId = `drafts.article-${slug}`;

  await sanity.createOrReplace({
    _id: draftId,
    _type: "article",
    title: generated.title,
    slug: { _type: "slug", current: slug },
    excerpt: generated.excerpt,
    body: toPortableText(generated.body),
    tags: generated.tags,
    author: "Mitra Telur Jogja",
    source: "claude-ai",
    ...(brief.categoryId && {
      category: { _type: "reference", _ref: brief.categoryId },
    }),
    // publishedAt sengaja dikosongkan: owner mengisinya saat publish, dan
    // query publik mensyaratkan defined(publishedAt).
  });

  await sanity
    .patch(brief._id)
    .set({ lastUsedAt: new Date().toISOString() })
    .commit();

  return NextResponse.json({
    ok: true,
    draftId,
    slug,
    title: generated.title,
    briefUsed: brief.title,
  });
}

/** Vercel Cron memanggil dengan GET. */
export const GET = handler;
/** Pemanggilan manual (curl / Studio) memakai POST. */
export const POST = handler;
