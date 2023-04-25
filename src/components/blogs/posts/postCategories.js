import { isEmpty } from "lodash";

const PostCategories = ({
  data,
  getPostByCat,
  setActiveCat,
  activeCat,
  featuredStatus,
  postType,
  pageSearch,
  pageSize
}) => {
  return (
    <div className="d-flex">
      {!isEmpty(data) ? (
        data.map((term) => {
          // console.log('id', term)
          return (
            <div
              key={term.databaseId}
              className={`term-lists__item ${
                activeCat == term.databaseId ? "active" : ""
              }`}
            >
              <span
                id={term.databaseId}
                onClick={() => {
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
