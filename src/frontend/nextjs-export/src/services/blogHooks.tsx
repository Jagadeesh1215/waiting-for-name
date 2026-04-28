"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Blog, BlogFormData, PaginatedBlogsResult } from "@/types/blog";
import {
  getAllBlogs,
  getBlogBySlug,
  getBlogsPaginated,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./blogService";

// ─── Query hooks ─────────────────────────────────────────────────────────────

export function useGetAllBlogs() {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
}

export function useGetBlogBySlug(slug: string) {
  return useQuery<Blog | null>({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
}

export function useGetBlogsPaginated(page: number, pageSize: number) {
  return useQuery<PaginatedBlogsResult>({
    queryKey: ["blogs", "paginated", page, pageSize],
    queryFn: () => getBlogsPaginated(page, pageSize),
  });
}

// ─── Mutation hooks ───────────────────────────────────────────────────────────

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation<Blog, Error, BlogFormData>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation<Blog, Error, { slug: string; data: BlogFormData }>({
    mutationFn: ({ slug, data }) => updateBlog(slug, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.slug] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
