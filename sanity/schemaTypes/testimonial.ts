import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimoni",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Peran / Bisnis", type: "string" }),
    defineField({
      name: "quote",
      title: "Testimoni",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (r) => r.min(1).max(5),
    }),
    defineField({ name: "order", title: "Urutan", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
