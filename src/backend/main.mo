import Types "types/blog";
import BlogMixin "mixins/blog-api";
import List "mo:core/List";

actor {
  let blogs = List.empty<Types.Blog>();
  var idCounter = { var value : Nat = 0 };

  include BlogMixin(blogs, idCounter);
};
