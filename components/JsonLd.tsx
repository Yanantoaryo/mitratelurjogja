/**
 * Skrip JSON-LD. Konten berasal dari Sanity (tepercaya, bukan input publik),
 * namun `<` tetap di-escape agar string apa pun tidak bisa menutup tag <script>.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
