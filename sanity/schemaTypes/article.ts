import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artikel / Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Sampul",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Isi Artikel",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "articleCategory" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "string",
      initialValue: "Mitra Telur Jogja",
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Publish",
      type: "datetime",
    }),
    defineField({
      name: "source",
      title: "Sumber Konten",
      type: "string",
      options: { list: ["manual", "claude-ai"] },
      initialValue: "manual",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Terbaru",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
