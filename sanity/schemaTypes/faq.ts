import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Pertanyaan",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Jawaban",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Urutan", type: "number" }),
  ],
  preview: { select: { title: "question" } },
});
