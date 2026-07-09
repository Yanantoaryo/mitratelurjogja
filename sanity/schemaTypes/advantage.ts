import { defineType, defineField } from "sanity";

export const advantage = defineType({
  name: "advantage",
  title: "Keunggulan",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Deskripsi", type: "text" }),
    defineField({
      name: "icon",
      title: "Nama Ikon (lucide)",
      type: "string",
      description: "Contoh: truck, shield-check, leaf",
    }),
    defineField({ name: "order", title: "Urutan", type: "number" }),
  ],
  preview: { select: { title: "title" } },
});
