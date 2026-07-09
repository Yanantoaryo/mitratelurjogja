import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produk",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Produk",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Deskripsi", type: "text" }),
    defineField({
      name: "image",
      title: "Gambar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "price",
      title: "Harga (IDR)",
      type: "number",
      description: "Harga per satuan, bisa diupdate harian",
    }),
    defineField({ name: "unit", title: "Satuan", type: "string" }),
    defineField({
      name: "availability",
      title: "Ketersediaan",
      type: "string",
      options: { list: ["InStock", "OutOfStock", "PreOrder"] },
      initialValue: "InStock",
    }),
    defineField({ name: "order", title: "Urutan", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
  },
});
