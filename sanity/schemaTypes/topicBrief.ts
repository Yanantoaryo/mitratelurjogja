import { defineType, defineField } from "sanity";

export const topicBrief = defineType({
  name: "topicBrief",
  title: "Topic Brief (Auto-Artikel Claude)",
  type: "document",
  description:
    "Brief topik untuk artikel yang di-generate otomatis oleh Claude AI setiap Senin & Kamis.",
  fields: [
    defineField({
      name: "title",
      title: "Judul Brief",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      title: "Topik / Angle",
      type: "text",
      description:
        "Deskripsi topik yang akan ditulis (mis. tips menyimpan telur, nutrisi telur omega).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "keywords",
      title: "Kata Kunci SEO",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "category",
      title: "Kategori Target",
      type: "reference",
      to: [{ type: "articleCategory" }],
    }),
    defineField({
      name: "active",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
      description: "Hanya brief aktif yang dipakai scheduler.",
    }),
    defineField({
      name: "lastUsedAt",
      title: "Terakhir Dipakai",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: { select: { title: "title", subtitle: "topic" } },
});
