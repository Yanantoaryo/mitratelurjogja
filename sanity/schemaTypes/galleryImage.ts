import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Galeri Foto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul / Caption",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: ["kegiatan", "produk", "event", "kunjungan-farm"],
      },
    }),
    defineField({
      name: "takenAt",
      title: "Tanggal",
      type: "date",
    }),
    defineField({ name: "order", title: "Urutan", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
