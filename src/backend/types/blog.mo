module {
  public type Blog = {
    id : Text;
    title : Text;
    slug : Text;
    category : Text;
    author : Text;
    authorDesignation : Text;
    content : Text;
    imageUrl : Text;
    imageAlt : Text;
    publishDate : Text;
    createdAt : Int;
  };

  public type CreateBlogInput = {
    title : Text;
    slug : Text;
    category : Text;
    author : Text;
    authorDesignation : Text;
    content : Text;
    imageUrl : Text;
    imageAlt : Text;
    publishDate : Text;
  };

  public type UpdateBlogInput = {
    title : Text;
    slug : Text;
    category : Text;
    author : Text;
    authorDesignation : Text;
    content : Text;
    imageUrl : Text;
    imageAlt : Text;
    publishDate : Text;
  };

  public type PaginatedBlogs = {
    blogs : [Blog];
    totalCount : Nat;
  };
};
