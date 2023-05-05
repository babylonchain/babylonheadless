import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
// import { GET_CATEGORIES } from "../../../queries/categories/get-categories";
import { GET_POSTS } from "../../../queries/posts/get-posts";
import { GET_POSTS_BY_CATEGORY } from "../../../queries/posts/get-postsByCat";
import { GET_FEATURED_POST } from "../../../queries/posts/get-featuredPost";
import { GET_NEWS } from "../../../queries/news/get-news";
import { GET_NEWS_BY_CATEGORY } from "../../../queries/news/get-newsByCat";
import { GET_FEATURED_NEWS } from "../../../queries/news/get-featuredNews";
import { GET_PODCASTS } from "../../../queries/podcast/get-podcasts";
import { GET_PODCAST_BY_CATEGORY } from "../../../queries/podcast/get-podcastByCat";
import { GET_FEATURED_PODCAST } from "../../../queries/podcast/get-featuredPodcast";
import Blogs from "../../blogs/posts/indexBlogs";
import PostCategories from "../../blogs/posts/postCategories";
import PostSortBy from "../../blogs/posts/postSortBy";
import EmptyPost from "../../EmptyPost";
import { useRouter } from "next/router";
import Loading from "../../Loading";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function BlogPostListingBlock({
  attributes,
  categories,
  newsCategories,
  podcastsCategories,
}) {

  const router = useRouter();
  const attributesData = JSON.parse(attributes);

  const align = attributesData?.align;
  const enable = attributesData?.data?.babylon_enable_section;
  const postType = attributesData?.data?.choose_post_type;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;


  const [initPageSize, setInitPageSize] = useState(6);
  // const [initPageOffset, setInitPageOffset] = useState(0);

  const [postsData, setPostsData] = useState([]);

  const [postsDataDefault, setPostsDataDefault] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    "hasNext": false,
    "endCursor": "",
    "offsetPagination": {
      "total": 0
    }
  });

  const [btnLoader, setBtnLoader] = useState(false)
  const [category, setCategory] = useState(categories);
  const [pageSize, setPageSize] = useState(6);

  const [activeCat, setActiveCat] = useState(null);
  const [featured, setFeatured] = useState("no");

  const [pageSearch, setPageSearch] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /********Queries on change filters******/
  const featuredQuery = (postType) => {
    if (postType === "news") {
      return GET_FEATURED_NEWS;
    } else if (postType === "podcasts") {
      return GET_FEATURED_PODCAST;
    } else {
      return GET_FEATURED_POST;
    }
  };
  const postByCatQuery = (postType) => {
    if (postType === "news") {
      return GET_NEWS_BY_CATEGORY;
    } else if (postType === "podcasts") {
      return GET_PODCAST_BY_CATEGORY;
    } else {
      return GET_POSTS_BY_CATEGORY;
    }
  };
  const getPostList = (postType) => {
    if (postType === "news") {
      return GET_NEWS;
    } else if (postType === "podcasts") {
      return GET_PODCASTS;
    } else {
      return GET_POSTS;
    }
  };
  /********Queries on change filters******/

  const [
    getPostByCat,
    { loading: lazyLoading, called: lazyCaled, data: lazy, refetch: onRefetch },
  ] = useLazyQuery(postByCatQuery(postType), {
    onCompleted: (data) => {
      setPosts(data?.posts ?? []);
      setBtnLoader(false)
    }
  });

  const [
    getPostByFeature,
    { loading: lazyLoadingFeature, called: lazyfeatcall, data: lazyfeature, refetch: onRefetchFeat },
  ] = useLazyQuery(featuredQuery(postType), {
    onCompleted: (data) => {
      setPosts(data?.posts ?? []);
      setBtnLoader(false)
    }
  });

  const [
    getPostByAll,
    { loading: lazyLoadingAll, called: lazyAllcall, data: lazyAll, refetch: onRefetchAll },
  ] = useLazyQuery(getPostList(postType), {
    onCompleted: (data) => {
      setPosts(data?.posts ?? []);
      setBtnLoader(false)
    }
  });

  // console.warn('from lazy pageinfor', pageInfo);
  const { loading, error, data, refetch } = useQuery(getPostList(postType), {
    variables: { first: 6, after: "" },
    onCompleted: (data) => {
      setPostsDefault(data?.posts ?? []);
      setBtnLoader(false)
    }
  });

  const setPosts = (posts) => {
    if (!posts || !posts?.edges) {
      return;
    }

    const newPosts = postsData.concat(posts?.edges);
    setPostsData(newPosts);

    setPageInfo({ ...posts?.pageInfo });
  };

  const setPostsDefault = (posts) => {
    if (!posts || !posts?.edges) {
      return;
    }

    const newPosts = postsDataDefault.concat(posts?.edges);

    setPostsDataDefault(newPosts);
    setPageInfo({ ...posts?.pageInfo });
  };


  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

  useEffect(() => {
    setFeatured("no");
    setActiveCat(null);
    setPostsData([]);
    setPostsDataDefault([]);
    if (postType === "news") {
      setCategory(newsCategories);
    } else if (postType === "podcasts") {
      setCategory(podcastsCategories);
    } else {
      setCategory(categories);
    }
  }, [router.asPath]);

  return (
    <section
      className={
        `section section-blog-listing ${padding ? padding : ""} ${paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align) + ' posts'
      }
    >
      <Container>
        <aside className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={handleShow} className="posts-cat-btn d-md-none">
            Filter
          </Button>
          <Offcanvas className="posts-cat-offcanvas d-md-none" show={show} onHide={handleClose} placement={'bottom'} >
            <Offcanvas.Body>
              <PostSortBy
                featuredStatus={featured}
                pageSearch={pageSearch}
                pageSize={pageSize}
                setFeatured={setFeatured}
                getPostByCat={getPostByCat}
                getPostByFeature={getPostByFeature}
                getPostByAll={getPostByAll}
                setPostsData={setPostsData}
                setPostsDataDefault={setPostsDataDefault}
                setActiveCat={setActiveCat}
                setPageInfo={setPageInfo}
                activeCat={activeCat}
                postType={postType}
                onClick={handleClose}
                refetch={refetch}
                setShow={setShow}
              />
              <PostCategories
                data={category}
                pageSize={pageSize}
                pageSearch={pageSearch}
                getPostByCat={getPostByCat}
                getPostByFeature={getPostByFeature}
                getPostByAll={getPostByAll}
                setPostsData={setPostsData}
                setPostsDataDefault={setPostsDataDefault}
                setActiveCat={setActiveCat}
                activeCat={activeCat}
                setPageInfo={setPageInfo}
                featuredStatus={featured}
                setFeatured={setFeatured}
                postType={postType}
                onClick={handleClose}
                refetch={refetch}
                setShow={setShow}
              />
            </Offcanvas.Body>
          </Offcanvas>
          <div className="posts-cat d-none d-md-flex">
            <PostSortBy
              featuredStatus={featured}
              pageSearch={pageSearch}
              pageSize={pageSize}
              setFeatured={setFeatured}
              getPostByCat={getPostByCat}
              getPostByFeature={getPostByFeature}
              getPostByAll={getPostByAll}
              setPostsData={setPostsData}
              setPostsDataDefault={setPostsDataDefault}
              setActiveCat={setActiveCat}
              setPageInfo={setPageInfo}
              activeCat={activeCat}
              postType={postType}
              refetch={refetch}
              setShow={setShow}
            />
            <PostCategories
              data={category}
              pageSize={pageSize}
              pageSearch={pageSearch}
              getPostByCat={getPostByCat}
              getPostByFeature={getPostByFeature}
              getPostByAll={getPostByAll}
              setPostsData={setPostsData}
              setPostsDataDefault={setPostsDataDefault}
              setActiveCat={setActiveCat}
              activeCat={activeCat}
              setPageInfo={setPageInfo}
              featuredStatus={featured}
              setFeatured={setFeatured}
              postType={postType}
              refetch={refetch}
              setShow={setShow}
            />
          </div>
          <div className="posts-search">
            <input name="blogSearch" type="text" placeholder="Search"
              onChange={e => {
                if (activeCat != null) {
                  getPostByCat({
                    variables: {
                      filterCats: activeCat,
                      first: pageSize,
                      after: "",
                      field: featured === "DESC" ? "META_KEY" : "DATE",
                      pageSearch: e.target.value,
                    }
                  });
                } else if (activeCat != 1 && featured === "DESC") {

                  getPostByFeature({
                    variables: {
                      filterCats: activeCat,
                      first: pageSize,
                      after: "",
                      pageSearch: pageSearch,
                    }
                  })

                } else {
                  getPostByAll({
                    variables: {
                      first: 6,
                      after: "",
                      pageSearch: pageSearch
                    }
                  })

                }
                setPageSearch(e.target.value);
                setPostsData([]);

              }} />
          </div>
        </aside>
        <div className="blog-listing-wrap">
          {loading || lazyLoading || lazyLoadingFeature || lazyLoadingAll ? (
            <div className="loading-wrapper d-flex justify-content-center h-100 align-items-center">
              <Loading />
            </div>
          ) :
            (
              <>
                {pageInfo?.offsetPagination?.total === 0 ? (
                  <EmptyPost errorMsg="Try different category by simply clicking the filter options." />
                ) : (
                  ""
                )}
                {pageInfo?.offsetPagination?.total != 0 && <Blogs
                  posts={postsData.length > 0 ? postsData : postsDataDefault ?? []}
                />}

                {pageInfo?.hasNextPage ? (
                  <div className="load-more-wrap w-full flex justify-center lg:my-10">
                    {loading || lazyLoading ? (
                      <div className="flex justify-center w-full border border-white px-3 py-2 my-8">
                        Loading...
                      </div>
                    ) : (
                      <button
                        className={`btn btn-secondary ${(btnLoader) ? "loading-btn" : ""}`}
                        onClick={(e) => {
                          setBtnLoader(true)
                          // loadMoreItems( pageInfo?.endCursor ); 
                          if (activeCat != null && postsData.length > 0) {
                            onRefetch({
                              filterCats: activeCat,
                              first: pageSize,
                              after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                              field: featured === "DESC" ? "META_KEY" : "DATE",
                              pageSearch: pageSearch,
                            });
                          } else if (activeCat != 1 && featured === "DESC" && postsData.length > 0) {
                            onRefetchFeat({
                              filterCats: activeCat,
                              first: pageSize,
                              after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                              pageSearch: pageSearch,
                            })
                          } else if (postsData.length > 0) {
                            onRefetchAll({
                              first: 6,
                              after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                              pageSearch: pageSearch
                            })
                          } else {
                            refetch({
                              first: pageSize,
                              after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                              pageSearch: pageSearch,
                            })
                          }
                        }
                        }
                      >
                        Load more
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C4.824 0 0.553781 3.954 0.0507812 9H2.06836C2.56336 5.06 5.928 2 10 2C14.072 2 17.4366 5.06 17.9316 9H19.9492C19.4452 3.954 15.176 0 10 0ZM0.0507812 11C0.250781 13.008 1.05458 14.8374 2.26758 16.3184L3.6875 14.8984C2.8295 13.7924 2.25136 12.457 2.06836 11H0.0507812ZM16.2715 14.9297C15.8575 15.4547 15.3855 15.9328 14.8555 16.3398L15.8672 18.0742C16.6802 17.4832 17.399 16.7698 18.002 15.9668L16.2715 14.9297ZM5.10352 16.3105L3.68164 17.7324C4.98764 18.8014 6.56592 19.5496 8.29492 19.8516L8.4375 17.8398C7.2005 17.5918 6.06452 17.0595 5.10352 16.3105ZM13.1309 17.3516C12.2949 17.7086 11.3846 17.9285 10.4316 17.9805L10.2891 19.9863C11.6611 19.9473 12.9606 19.621 14.1406 19.082L13.1309 17.3516Z" fill="currentColor"></path></svg>
                      </button>
                    )}
                  </div>
                ) : null}
              </>
            )}
        </div>
      </Container>
    </section>
  );
}
