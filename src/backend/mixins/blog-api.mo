import Types "../types/blog";
import BlogLib "../lib/blog";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (blogs : List.List<Types.Blog>, idCounter : { var value : Nat }) {

  /// Create a new blog post.
  public shared func createBlog(input : Types.CreateBlogInput) : async { #ok : Types.Blog; #err : Text } {
    idCounter.value += 1;
    let timestamp = Time.now();
    BlogLib.createBlog(blogs, input, timestamp, idCounter.value);
  };

  /// Retrieve a single blog post by its unique slug.
  public query func getBlogBySlug(slug : Text) : async ?Types.Blog {
    BlogLib.getBlogBySlug(blogs, slug);
  };

  /// Retrieve all blog posts sorted by createdAt descending.
  public query func getAllBlogs() : async [Types.Blog] {
    BlogLib.getAllBlogs(blogs);
  };

  /// Retrieve a paginated, filtered, and searched list of blog posts.
  public query func getBlogsPaginated(
    pageNumber : Nat,
    pageSize : Nat,
    categoryFilter : Text,
    searchQuery : Text,
  ) : async Types.PaginatedBlogs {
    BlogLib.getBlogsPaginated(blogs, pageNumber, pageSize, categoryFilter, searchQuery);
  };

  /// Update an existing blog post identified by slug.
  public shared func updateBlog(slug : Text, input : Types.UpdateBlogInput) : async { #ok : Types.Blog; #err : Text } {
    let timestamp = Time.now();
    BlogLib.updateBlog(blogs, slug, input, timestamp);
  };

  /// Delete a blog post by slug.
  public shared func deleteBlog(slug : Text) : async { #ok : (); #err : Text } {
    BlogLib.deleteBlog(blogs, slug);
  };
};
