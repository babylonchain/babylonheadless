import { useRef, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import ChevronDown from "../../Icons/chevron-down";
import { isMobileOnly } from 'react-device-detect';

const Categories = ({
  data,
  getPostByCat,
  setActiveCat,
  activeCat,
  setPageActive,
  setPageOffset,
  featuredStatus,
  setFeatured,
  postType,
}) => {
  const [titleToggle, setTitleToggle] = useState(true);
  const linksContainerRef = useRef(null);
  const linkRef = useRef(null);
  // console.warn(linkRef);
  useEffect(() => {
    const menuHeight = linkRef.current.getBoundingClientRect().height;
    if (titleToggle) {
      linksContainerRef.current.style.height = `${menuHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [titleToggle]);

  useEffect(() => {
    if( isMobileOnly ) {
      setTitleToggle(false);
    }    
  }, []);

  return (
    <div className={`sidebar-widget ${titleToggle ? "" : "toggle-hide"}`}>
      <h4
        className="d-flex align-items-center"
        onClick={() => setTitleToggle(!titleToggle)}
      >
        Categories{" "}
        <span className="icon ms-auto">
          <ChevronDown />
        </span>
      </h4>
      {!isEmpty(data) ? (
        <div className="sidebar-widget__item" ref={linksContainerRef}>
          <ul className="term-lists" ref={linkRef}>
            {data.map((term) => {
              // console.log('id', term)
              return (
                <li
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
                        },
                      });
                      setActiveCat(
                        postType === "news" || postType === "podcasts"
                          ? term.databaseId.toString()
                          : term.databaseId
                      );
                      setPageActive(1);
                      setPageOffset(0);
                      // setFeatured('');
                    }}
                  >
                    {term.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Categories;
