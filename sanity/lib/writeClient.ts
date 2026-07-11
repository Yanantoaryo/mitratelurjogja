import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Client bertoken, terpisah dari `client` publik di client.ts. Dipisah supaya
 * token tidak pernah ikut ke jalur baca halaman: begitu sebuah client membawa
 * token, query anonim berhenti menyembunyikan draft dan draft auto-artikel
 * akan terbaca publik.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error("Missing environment variable: SANITY_API_WRITE_TOKEN");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
