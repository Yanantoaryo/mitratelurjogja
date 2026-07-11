import { defineType, defineField } from "sanity";

export const articleCategory = defineType({
  name: "articleCategory",
  title: "Kategori Artikel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama Kategori",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Deskripsi", type: "text" }),
  ],
  preview: { select: { title: "title" } },
});
