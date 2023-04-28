const PostSortBy = ({
  featuredStatus,
  pageSearch,
  pageSize,
  setFeatured,
  setPageActive,
  setPageOffset,
  getPostByCat,
  getPostByFeature,
  getPostByAll,
  setPostsData,
  setPostsDataDefault,
  setPageInfo,
  setActiveCat,
  activeCat,
  refetch
}) => {
  return (
    <div className="d-flex">
      <div
        className={`term-lists__item ( ${featuredStatus === "no" ? "active" : ""
          }`}
      >
        <span
          onClick={() => {
            setPostsData([]);
            setPostsDataDefault([]);
            setFeatured("no");
            setActiveCat(null)
            getPostByAll({
              variables: {
              first: 6,
              after: "",
              }
            })
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
            setPostsData([]);
            setPostsDataDefault([]);
            setFeatured("DESC");
            setActiveCat(null)
            getPostByFeature({
              variables: {
                filterCats: activeCat,
                first: pageSize,
                after: "",
                pageSearch: pageSearch,
              }
            })
          }}
        >
          Featured
        </span>
      </div>
    </div>
  );
};
export default PostSortBy;