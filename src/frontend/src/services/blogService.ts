import { createActor } from "@/backend";
import type { Blog, BlogFormData, PaginatedBlogsResult } from "@/types/blog";
import { useActor } from "@caffeineai/core-infrastructure";

type BackendResult<T> =
  | { __kind__: "ok"; ok: T }
  | { __kind__: "err"; err: string };

function unwrapResult<T>(result: BackendResult<T>): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

export function useBlogService() {
  const { actor, isFetching } = useActor(createActor);

  const getAllBlogs = async (): Promise<Blog[]> => {
    if (!actor) return [];
    const result = await (
      actor as unknown as {
        getAllBlogs: () => Promise<BackendResult<Blog[]>>;
      }
    ).getAllBlogs();
    return unwrapResult(result);
  };

  const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    if (!actor) return null;
    const result = await (
      actor as unknown as {
        getBlogBySlug: (slug: string) => Promise<BackendResult<Blog>>;
      }
    ).getBlogBySlug(slug);
    try {
      return unwrapResult(result);
    } catch {
      return null;
    }
  };

  const getBlogsPaginated = async (
    page: bigint,
    pageSize: bigint,
  ): Promise<PaginatedBlogsResult> => {
    if (!actor) return { blogs: [], totalCount: 0n };
    const result = await (
      actor as unknown as {
        getBlogsPaginated: (
          page: bigint,
          pageSize: bigint,
        ) => Promise<BackendResult<PaginatedBlogsResult>>;
      }
    ).getBlogsPaginated(page, pageSize);
    return unwrapResult(result);
  };

  const createBlog = async (data: BlogFormData): Promise<Blog> => {
    if (!actor) throw new Error("No actor available");
    const result = await (
      actor as unknown as {
        createBlog: (data: BlogFormData) => Promise<BackendResult<Blog>>;
      }
    ).createBlog(data);
    return unwrapResult(result);
  };

  const updateBlog = async (
    slug: string,
    data: BlogFormData,
  ): Promise<Blog> => {
    if (!actor) throw new Error("No actor available");
    const result = await (
      actor as unknown as {
        updateBlog: (
          slug: string,
          data: BlogFormData,
        ) => Promise<BackendResult<Blog>>;
      }
    ).updateBlog(slug, data);
    return unwrapResult(result);
  };

  const deleteBlog = async (slug: string): Promise<void> => {
    if (!actor) throw new Error("No actor available");
    const result = await (
      actor as unknown as {
        deleteBlog: (slug: string) => Promise<BackendResult<null>>;
      }
    ).deleteBlog(slug);
    unwrapResult(result);
  };

  return {
    actor,
    isFetching,
    getAllBlogs,
    getBlogBySlug,
    getBlogsPaginated,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
