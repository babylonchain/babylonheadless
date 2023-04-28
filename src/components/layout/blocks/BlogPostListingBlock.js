import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
// import { GET_CATEGORIES } from "../../../queries/categories/get-categories";
import { GET_POSTS } from "../../../queries/posts/get-posts";
import { GET_POSTS_BY_CATEGORY } from "../../../queries/posts/get-postsByCat";
import { GET_FEATURED_POST } from "../../../queries/posts/get-featuredPost";
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
}) {

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
    return GET_FEATURED_POST;
  };
  const postByCatQuery = (postType) => {
    return GET_POSTS_BY_CATEGORY;
  };
  const getPostList = (postType) => {
    return GET_POSTS;
  };
  /********Queries on change filters******/

const [
  getPostByCat,
  { loading: lazyLoading, called: lazyCaled, data: lazy, refetch: onRefetch },
] =  useLazyQuery(postByCatQuery(postType), {
      onCompleted: (data) => {
        setPosts(data?.posts ?? []);
      }
    });

const [
  getPostByFeature,
  { loading: lazyLoadingFeature, called: lazyfeatcall, data: lazyfeature, refetch: onRefetchFeat },
] =  useLazyQuery(featuredQuery(postType), {
        onCompleted: (data) => {
          setPosts(data?.posts ?? []);
        }
      });

const [
  getPostByAll,
  { loading: lazyLoadingAll, called: lazyAllcall, data: lazyAll, refetch: onRefetchAll },
] =  useLazyQuery(getPostList(postType), {
      onCompleted: (data) => {
        setPosts(data?.posts ?? []);
      }
    });

  // console.warn('from lazy pageinfor', pageInfo);
  const { loading, error, data, refetch } = useQuery(getPostList(postType), {
    variables: { first: 6, after: "" },
    onCompleted: (data) => {
      setPostsDefault(data?.posts ?? []);
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
  console.log(pageInfo)

  return (
    <section
      className={
        `section section-blog-listing ${padding ? padding : ""} ${paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align) + ' ' + postType
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
                if(activeCat!=null){
                  getPostByCat({
                    variables: {
                      filterCats: activeCat,
                      first: pageSize,
                      after: "",
                      field: featured === "DESC" ? "META_KEY" : "DATE",
                      pageSearch: e.target.value,
                    }
                  });
                }else if(activeCat!=1 && featured==="DESC"){

                  getPostByFeature({
                    variables: {
                      filterCats: activeCat,
                      first: pageSize,
                      after: "",
                      pageSearch: pageSearch,
                    }
                  })

                }else{
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
          ) : (
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
                      className="btn btn-secondary"
                      onClick={(e) => {
                        // loadMoreItems( pageInfo?.endCursor ); 
                        if(activeCat!=null && postsData.length > 0){
                          getPostByCat({
                            variables: {
                              filterCats: activeCat,
                              first: pageSize,
                              after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                              field: featured === "DESC" ? "META_KEY" : "DATE",
                              pageSearch: pageSearch,
                            }
                          });
                        }else if(activeCat!=1 && featured==="DESC" && postsData.length > 0){
        
                          getPostByFeature({
                            variables: {
                              filterCats: activeCat,
                              first: pageSize,
                              after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                              pageSearch: pageSearch,
                            }
                          })
        
                        }else if ( postsData.length > 0){
                          getPostByAll({
                            variables: {
                            first: 6,
                            after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                            pageSearch: pageSearch
                            }
                          })
        
                        }else{
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
