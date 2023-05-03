import { isEmpty } from "lodash";

const PostCategories = ({
  data,
  getPostByCat,
  setFeatured,
  setActiveCat,
  activeCat,
  featuredStatus,
  postType,
  pageSearch,
  pageSize,
  setPostsData,
  setShow
}) => {
  return (
    <div className="d-flex">
      {!isEmpty(data) ? (
        data.map((term) => {
          // console.log('id', term)
          return (
            <div
              key={term.databaseId}
              className={`term-lists__item ${activeCat == term.databaseId ? "active" : ""
                }`}
            >
              <span
                id={term.databaseId}
                onClick={() => {
                  setPostsData([]);
                  setFeatured("");
                  getPostByCat({
                    variables: {
                      field:
                        featuredStatus === "DESC" ? "META_KEY" : "DATE",
                      filterCats:
                        postType === "news" || postType === "podcasts"
                          ? term.databaseId.toString()
                          : term.databaseId,
                      onlySticky: null,
                      pageSearch: pageSearch,
                      first: pageSize,
                      after: "",
                    },
                  });
                  setActiveCat(
                    postType === "news" || postType === "podcasts"
                      ? term.databaseId.toString()
                      : term.databaseId
                  );
                  setShow(false);
                }}
              >
                {term.name}
              </span>
            </div>
          );
        })
      ) : (
        ""
      )}
    </div>
  );
};
export default PostCategories;
