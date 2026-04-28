"use client";

import type { Blog, BlogFormData, PaginatedBlogsResult } from "@/types/blog";

// ─── Types ────────────────────────────────────────────────────────────────────

type BackendResult<T> =
  | { __kind__: "ok"; ok: T }
  | { __kind__: "err"; err: string };

function unwrapResult<T>(result: BackendResult<T>): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

// ─── API Base URL ─────────────────────────────────────────────────────────────
// In Next.js 15, use NEXT_PUBLIC_ prefix for client-accessible env vars.
// Replace VITE_API_URL → NEXT_PUBLIC_API_URL in your .env file.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

// ─── Blog Service (REST-based for Next.js) ────────────────────────────────────
// This service replaces the Motoko actor calls with Next.js API route calls.
// Wire these functions to your /api/blogs route handlers in the App Router.

export async function getAllBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_BASE_URL}/blogs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const result: BackendResult<Blog[]> = await res.json();
  return unwrapResult(result);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const result: BackendResult<Blog> = await res.json();
    return unwrapResult(result);
  } catch {
    return null;
  }
}

export async function getBlogsPaginated(
  page: number,
  pageSize: number,
): Promise<PaginatedBlogsResult> {
  const res = await fetch(
    `${API_BASE_URL}/blogs?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );
  if (!res.ok) return { blogs: [], totalCount: 0n };
  const result: BackendResult<PaginatedBlogsResult> = await res.json();
  return unwrapResult(result);
}

export async function createBlog(data: BlogFormData): Promise<Blog> {
  const res = await fetch(`${API_BASE_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create blog");
  const result: BackendResult<Blog> = await res.json();
  return unwrapResult(result);
}

export async function updateBlog(
  slug: string,
  data: BlogFormData,
): Promise<Blog> {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update blog");
  const result: BackendResult<Blog> = await res.json();
  return unwrapResult(result);
}

export async function deleteBlog(slug: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete blog");
  const result: BackendResult<null> = await res.json();
  unwrapResult(result);
}
