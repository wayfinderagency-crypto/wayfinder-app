export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  cover?: {
    id: number;
    url: string;
    alternativeText?: string | null;
  } | null;
};
