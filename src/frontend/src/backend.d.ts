import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateBlogInput {
    title: string;
    content: string;
    publishDate: string;
    slug: string;
    author: string;
    imageAlt: string;
    imageUrl: string;
    category: string;
    authorDesignation: string;
}
export interface PaginatedBlogs {
    totalCount: bigint;
    blogs: Array<Blog>;
}
export interface CreateBlogInput {
    title: string;
    content: string;
    publishDate: string;
    slug: string;
    author: string;
    imageAlt: string;
    imageUrl: string;
    category: string;
    authorDesignation: string;
}
export interface Blog {
    id: string;
    title: string;
    content: string;
    publishDate: string;
    createdAt: bigint;
    slug: string;
    author: string;
    imageAlt: string;
    imageUrl: string;
    category: string;
    authorDesignation: string;
}
export interface backendInterface {
    createBlog(input: CreateBlogInput): Promise<{
        __kind__: "ok";
        ok: Blog;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteBlog(slug: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllBlogs(): Promise<Array<Blog>>;
    getBlogBySlug(slug: string): Promise<Blog | null>;
    getBlogsPaginated(pageNumber: bigint, pageSize: bigint, categoryFilter: string, searchQuery: string): Promise<PaginatedBlogs>;
    updateBlog(slug: string, input: UpdateBlogInput): Promise<{
        __kind__: "ok";
        ok: Blog;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
