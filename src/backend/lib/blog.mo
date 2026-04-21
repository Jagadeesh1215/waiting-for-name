import Types "../types/blog";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {
  public type Blog = Types.Blog;
  public type CreateBlogInput = Types.CreateBlogInput;
  public type UpdateBlogInput = Types.UpdateBlogInput;
  public type PaginatedBlogs = Types.PaginatedBlogs;

  let VALID_CATEGORIES = ["SPINE", "BRAIN", "NEUROLOGY", "REHABILITATION", "GENERAL"];

  /// Generate a unique ID: "blog-<counter>"
  public func generateId(timestamp : Int, counter : Nat) : Text {
    ignore timestamp;
    "blog-" # counter.toText();
  };

  /// Validate that a category is one of the allowed values.
  public func isValidCategory(category : Text) : Bool {
    VALID_CATEGORIES.find<Text>(func(c) { c == category }) != null;
  };

  /// Check if a slug already exists among stored blogs.
  public func slugExists(blogs : List.List<Blog>, slug : Text) : Bool {
    blogs.find(func(b) { b.slug == slug }) != null;
  };

  /// Insert a new blog into the list; returns the created Blog or error.
  public func createBlog(
    blogs : List.List<Blog>,
    input : CreateBlogInput,
    timestamp : Int,
    counter : Nat,
  ) : { #ok : Blog; #err : Text } {
    // Validate required fields
    if (input.title == "") return #err("Title is required");
    if (input.slug == "") return #err("Slug is required");
    if (input.author == "") return #err("Author is required");
    if (input.content == "") return #err("Content is required");
    if (input.publishDate == "") return #err("Publish date is required");

    // Validate category
    if (not isValidCategory(input.category)) {
      return #err("Invalid category. Must be one of: SPINE, BRAIN, NEUROLOGY, REHABILITATION, GENERAL");
    };

    // Check slug uniqueness
    if (slugExists(blogs, input.slug)) {
      return #err("A blog with slug '" # input.slug # "' already exists");
    };

    let blog : Blog = {
      id = generateId(timestamp, counter);
      title = input.title;
      slug = input.slug;
      category = input.category;
      author = input.author;
      authorDesignation = input.authorDesignation;
      content = input.content;
      imageUrl = input.imageUrl;
      imageAlt = input.imageAlt;
      publishDate = input.publishDate;
      createdAt = timestamp;
    };

    blogs.add(blog);
    #ok(blog);
  };

  /// Retrieve a blog by its slug.
  public func getBlogBySlug(blogs : List.List<Blog>, slug : Text) : ?Blog {
    blogs.find(func(b) { b.slug == slug });
  };

  /// Return all blogs as an immutable array sorted by createdAt descending.
  public func getAllBlogs(blogs : List.List<Blog>) : [Blog] {
    let arr = blogs.toArray();
    arr.sort<Blog>(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };

  /// Return a paginated, filtered, and searched slice of blogs.
  public func getBlogsPaginated(
    blogs : List.List<Blog>,
    pageNumber : Nat,
    pageSize : Nat,
    categoryFilter : Text,
    searchQuery : Text,
  ) : PaginatedBlogs {
    let filterCat = categoryFilter == "" or categoryFilter == "ALL";
    let filterSearch = searchQuery == "";

    let lowerQuery = searchQuery.toLower();

    // Filter
    let filtered = blogs.filter(func(b) {
      let catMatch = filterCat or b.category == categoryFilter;
      let searchMatch = filterSearch or
        b.title.toLower().contains(#text lowerQuery) or
        b.author.toLower().contains(#text lowerQuery);
      catMatch and searchMatch;
    });

    // Sort descending by createdAt
    let sorted = filtered.toArray().sort(
      func(a, b) { Int.compare(b.createdAt, a.createdAt) },
    );

    let totalCount = sorted.size();

    // Paginate (pageNumber is 1-indexed)
    let safePageSize = if (pageSize == 0) 10 else pageSize;
    let safePage = if (pageNumber == 0) 1 else pageNumber;
    let start = (safePage - 1) * safePageSize;

    let pageBlogs : [Blog] = if (start >= totalCount) {
      [];
    } else {
      let end = Nat.min(start + safePageSize, totalCount);
      sorted.sliceToArray<Blog>(start.toInt(), end.toInt());
    };

    { blogs = pageBlogs; totalCount };
  };

  /// Update an existing blog by slug; returns the updated Blog.
  public func updateBlog(
    blogs : List.List<Blog>,
    slug : Text,
    input : UpdateBlogInput,
    timestamp : Int,
  ) : { #ok : Blog; #err : Text } {
    ignore timestamp;

    // Validate required fields
    if (input.title == "") return #err("Title is required");
    if (input.author == "") return #err("Author is required");
    if (input.content == "") return #err("Content is required");
    if (input.publishDate == "") return #err("Publish date is required");

    // Validate category
    if (not isValidCategory(input.category)) {
      return #err("Invalid category. Must be one of: SPINE, BRAIN, NEUROLOGY, REHABILITATION, GENERAL");
    };

    var updated : ?Blog = null;

    blogs.mapInPlace(func(b) {
      if (b.slug == slug) {
        let newBlog : Blog = {
          b with
          title = input.title;
          category = input.category;
          author = input.author;
          authorDesignation = input.authorDesignation;
          content = input.content;
          imageUrl = input.imageUrl;
          imageAlt = input.imageAlt;
          publishDate = input.publishDate;
        };
        updated := ?newBlog;
        newBlog;
      } else {
        b;
      };
    });

    switch (updated) {
      case (?b) #ok(b);
      case null #err("Blog with slug '" # slug # "' not found");
    };
  };

  /// Delete a blog by slug; returns unit on success.
  public func deleteBlog(
    blogs : List.List<Blog>,
    slug : Text,
  ) : { #ok : (); #err : Text } {
    let sizeBefore = blogs.size();
    let filtered = blogs.filter(func(b) { b.slug != slug });
    if (filtered.size() == sizeBefore) {
      return #err("Blog with slug '" # slug # "' not found");
    };
    blogs.clear();
    blogs.append(filtered);
    #ok(());
  };
};
