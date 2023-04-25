import { useRef, useState, useEffect } from "react";
import ChevronDown from "../../Icons/chevron-down";
import { useRouter } from "next/router";
import { isMobileOnly } from 'react-device-detect';
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
  // console.log('feat', setFeatured)
  const [titleToggle, setTitleToggle] = useState(true);
  const linksContainerRef = useRef(null);
  const linkRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const menuHeight = linkRef.current.getBoundingClientRect().height;
    if (titleToggle ) {
      linksContainerRef.current.style.height = `${menuHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
    
  }, [titleToggle, router.asPath]);

  useEffect(() => {
    if( isMobileOnly ) {
      setTitleToggle(false);
    }    
  }, []);


  return (
    <div 
    className={`sidebar-widget 
    ${(titleToggle) ? "" : "toggle-hide"}
    `}>
      <h4
        className="d-flex align-items-center"
        onClick={() => setTitleToggle(!titleToggle)}
      >
        Sort by{" "}
        <span className="icon ms-auto">
          <ChevronDown />
        </span>
      </h4>
      <div className="sidebar-widget__item" ref={linksContainerRef}>
        <ul className="term-lists" ref={linkRef}>
          <li
            className={`term-lists__item ${
              featuredStatus === "DESC" ? "active" : ""
            }`}
          >
            <span
              onClick={() => {
                setPostsData((prev)=>{ return [];});
                setFeatured("DESC");
                getPostByCat({ variables: {
                  filterCats: activeCat,
                  first: pageSize,
                  after: "",
                  field: "META_KEY",
                  pageSearch: pageSearch,
                } });
              }}
            >
              Featured
            </span>
          </li>
          <li
            className={`term-lists__item ${
              featuredStatus === "DESC" ? "" : "active"
            }`}
          >
            <span
              onClick={() => {
                setPostsData([]);
                setFeatured("");
                getPostByCat({ variables: {
                  filterCats: activeCat,
                  first: pageSize,
                  after: "",
                  field: "DATE",
                  pageSearch: pageSearch,
                } });
              }}
            >
              All articles
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default PostSortBy;
