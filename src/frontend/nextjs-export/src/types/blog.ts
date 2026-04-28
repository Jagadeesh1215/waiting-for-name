export const CATEGORIES = [
  "SPINE",
  "BRAIN",
  "NEUROLOGY",
  "REHABILITATION",
  "GENERAL",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  authorDesignation: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  publishDate: string;
  createdAt: bigint;
}

export interface PaginatedBlogsResult {
  blogs: Blog[];
  totalCount: bigint;
}

export interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  author: string;
  authorDesignation: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  publishDate: string;
}
