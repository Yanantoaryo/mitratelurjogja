import "server-only";
import type { QueryParams } from "next-sanity";
import { client } from "./client";

/** Harga telur diperbarui harian; 60 detik cukup segar tanpa membebani API. */
export const REVALIDATE_SECONDS = 60;

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  revalidate: number = REVALIDATE_SECONDS
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
}
