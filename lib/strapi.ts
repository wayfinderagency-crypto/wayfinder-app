// lib/strapi.ts
export const API_URL = "https://dedicated-bee-eac5c79691.strapiapp.com/api";

export async function strapiFetch(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from Strapi");
  }
  return res.json();
}

// Funkcja do media
export function mediaUrl(path: string) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `https://dedicated-bee-eac5c79691.strapiapp.com${path}`;
}
