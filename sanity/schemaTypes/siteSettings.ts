import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({ name: "businessName", title: "Nama Bisnis", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Deskripsi", type: "text" }),
    defineField({ name: "address", title: "Alamat", type: "string" }),
    defineField({
      name: "geo",
      title: "Koordinat (LocalBusiness)",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({
      name: "phones",
      title: "Nomor Telepon / WA",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "openingHours",
      title: "Jam Operasional",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "days",
              title: "Hari",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
              },
            }),
            defineField({ name: "opens", title: "Buka (HH:MM)", type: "string" }),
            defineField({ name: "closes", title: "Tutup (HH:MM)", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "socials",
      title: "Media Sosial",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Statistik (Social Proof)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Nilai", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Pengaturan Situs" }) },
});
