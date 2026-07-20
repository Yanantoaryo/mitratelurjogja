/**
 * Seed dokumen `topicBrief` ke Sanity.
 *
 * Scheduler auto-artikel (`app/api/generate-article/route.ts`) memilih brief
 * aktif yang paling lama tidak dipakai. Kalau brief aktif cuma sedikit, tiap
 * run menghasilkan topik yang berulang, jadi daftar ini perlu dijaga tetap
 * banyak. Dengan jadwal 2x seminggu, N brief berputar selama N/2 minggu.
 *
 * Pakai `createIfNotExists` dengan `_id` eksplisit, jadi aman dijalankan
 * berulang kali: brief yang sudah ada tidak ditimpa dan `lastUsedAt`-nya tidak
 * ikut ter-reset.
 *
 * Jalankan:
 *   npm run seed:briefs             # tulis ke dataset
 *   npm run seed:briefs -- --dry-run # tampilkan rencananya saja
 */

const DRY_RUN = process.argv.includes("--dry-run");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

/**
 * Brief menunjuk ke `articleCategory` lewat referensi. Id kategori di-hardcode
 * karena jumlahnya tetap dan dibuat manual di Studio; kalau nanti ada kategori
 * baru, tambahkan id-nya di sini.
 */
const KATEGORI = {
  bisnis: "cat-bisnis-kuliner",
  nutrisi: "cat-nutrisi",
  penyimpanan: "cat-tips-penyimpanan",
};

/**
 * Angle sengaja dijaga agar tidak menabrak aturan di SYSTEM_PROMPT route:
 * tanpa klaim medis, tanpa harga spesifik, tanpa testimoni. Topik yang sudah
 * pernah terbit juga dihindari supaya tidak terjadi keyword cannibalization.
 */
const BRIEFS = [
  {
    _id: "brief-jenis-telur",
    title: "Beda telur negeri, kampung, dan omega",
    topic:
      "Perbandingan telur ayam negeri, telur ayam kampung, dan telur omega dari sisi ciri fisik, tekstur, rasa, dan kecocokan penggunaan di dapur. Fokus pada perbedaan yang bisa diamati langsung, bukan klaim kesehatan.",
    keywords: ["telur negeri", "telur kampung", "telur omega", "jenis telur ayam"],
    category: KATEGORI.nutrisi,
  },
  {
    _id: "brief-ukuran-grading",
    title: "Ukuran dan grading telur",
    topic:
      "Penjelasan ukuran telur (kecil, sedang, besar) dan bagaimana pelaku usaha kuliner memilih ukuran yang sesuai untuk kebutuhan bakery, warung makan, atau katering. Termasuk kenapa konsistensi ukuran penting untuk resep.",
    keywords: ["ukuran telur", "grading telur", "telur besar", "telur untuk bakery"],
    category: KATEGORI.bisnis,
  },
  {
    _id: "brief-manajemen-stok",
    title: "Manajemen stok telur untuk usaha",
    topic:
      "Cara mengelola stok telur di usaha kuliner: sistem rotasi FIFO, menentukan frekuensi pemesanan, mencatat tanggal masuk, dan menekan angka telur rusak atau kedaluwarsa.",
    keywords: ["manajemen stok telur", "rotasi stok", "FIFO telur", "stok dapur"],
    category: KATEGORI.bisnis,
  },
  {
    _id: "brief-pilih-supplier",
    title: "Cara memilih supplier telur",
    topic:
      "Hal yang perlu diperhatikan saat memilih supplier telur untuk usaha: konsistensi kualitas, keandalan jadwal antar, cara pengemasan, fleksibilitas volume, dan kemudahan komunikasi. Tanpa menyebut harga spesifik.",
    keywords: ["supplier telur", "supplier telur jogja", "distributor telur", "vendor telur"],
    category: KATEGORI.bisnis,
  },
  {
    _id: "brief-hitung-kebutuhan",
    title: "Menghitung kebutuhan telur untuk acara",
    topic:
      "Panduan praktis memperkirakan jumlah telur untuk katering, hajatan, atau produksi harian: cara menghitung dari porsi dan resep, menyiapkan cadangan, serta mengatur jadwal pengiriman agar telur tetap segar saat dipakai.",
    keywords: ["kebutuhan telur katering", "hitung telur", "telur untuk hajatan", "porsi telur"],
    category: KATEGORI.bisnis,
  },
  {
    _id: "brief-penanganan-distribusi",
    title: "Penanganan telur agar tidak pecah",
    topic:
      "Teknik menangani dan mengemas telur agar aman selama pengangkutan dan penyimpanan: posisi ujung telur, penggunaan tray, penumpukan yang aman, dan penanganan saat bongkar muat.",
    keywords: ["telur pecah", "pengemasan telur", "tray telur", "distribusi telur"],
    category: KATEGORI.penyimpanan,
  },
  {
    _id: "brief-warna-cangkang",
    title: "Warna cangkang dan kuning telur",
    topic:
      "Menjelaskan apa yang sebenarnya menentukan warna cangkang telur dan warna kuning telur, serta meluruskan anggapan umum bahwa warna menandakan kualitas. Tetap pada penjelasan faktual, tanpa klaim gizi berlebihan.",
    keywords: ["warna cangkang telur", "warna kuning telur", "telur coklat", "kualitas telur"],
    category: KATEGORI.penyimpanan,
  },
];

function requireEnv() {
  const missing = [
    ["NEXT_PUBLIC_SANITY_PROJECT_ID", projectId],
    ["NEXT_PUBLIC_SANITY_DATASET", dataset],
    ["SANITY_API_WRITE_TOKEN", token],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    console.error(`Env belum lengkap: ${missing.join(", ")}`);
    console.error("Jalankan lewat `npm run seed:briefs` agar .env.local ikut terbaca.");
    process.exit(1);
  }
}

function toMutation(brief) {
  return {
    createIfNotExists: {
      _id: brief._id,
      _type: "topicBrief",
      title: brief.title,
      topic: brief.topic,
      keywords: brief.keywords,
      category: { _type: "reference", _ref: brief.category },
      active: true,
      // lastUsedAt sengaja dikosongkan. Query scheduler memakai
      // coalesce(lastUsedAt, "1970-01-01"), jadi brief baru didahulukan.
    },
  };
}

async function main() {
  requireEnv();

  if (DRY_RUN) {
    console.log(`[dry-run] ${BRIEFS.length} brief akan dikirim ke dataset "${dataset}":`);
    for (const brief of BRIEFS) console.log(`  ${brief._id.padEnd(30)} ${brief.title}`);
    console.log("\nTidak ada yang ditulis. Hapus --dry-run untuk menjalankan.");
    return;
  }

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations: BRIEFS.map(toMutation) }),
    }
  );

  const body = await response.json();

  if (!response.ok || body.error) {
    console.error("Gagal menulis ke Sanity:", JSON.stringify(body.error ?? body, null, 2));
    process.exit(1);
  }

  console.log(`Transaksi ${body.transactionId} — ${body.results.length} brief diproses.`);
  console.log("Brief yang sudah ada dilewati tanpa diubah.");
}

main().catch((error) => {
  console.error("Gagal:", error.message);
  process.exit(1);
});
