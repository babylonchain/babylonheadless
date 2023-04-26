const PostSortBy = ({
  featuredStatus,
  pageSearch,
  pageSize,
  setFeatured,
  setPageActive,
  setPageOffset,
  getPostByCat,
  setPostsData,
  setPageInfo,
  setActiveCat,
  activeCat,
}) => {
  return (
    <div className="d-flex">
      <div
        className={`term-lists__item ${featuredStatus === "DESC" ? "" : "active"
          }`}
      >
        <span
          onClick={() => {
            setPostsData([]);
            setFeatured("");
            getPostByCat({
              variables: {
                filterCats: activeCat,
                first: pageSize,
                after: "",
                field: "DATE",
                pageSearch: pageSearch,
              }
            });
          }}
        >
          All articles
        </span>
      </div>
      <div
        className={`term-lists__item ${featuredStatus === "DESC" ? "active" : ""
          }`}
      >
        <span
          onClick={() => {
            setPostsData((prev) => { return []; });
            setFeatured("DESC");
            getPostByCat({
              variables: {
                filterCats: activeCat,
                first: pageSize,
                after: "",
                field: "META_KEY",
                pageSearch: pageSearch,
              }
            });
          }}
        >
          Featured
        </span>
      </div>
    </div>
  );
};
export default PostSortBy;