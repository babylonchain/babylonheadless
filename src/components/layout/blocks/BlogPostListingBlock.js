import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
// import { GET_CATEGORIES } from "../../../queries/categories/get-categories";
import { GET_POSTS } from "../../../queries/posts/get-posts";
import { GET_POSTS_BY_CATEGORY } from "../../../queries/posts/get-postsByCat";
import { GET_FEATURED_POST } from "../../../queries/posts/get-featuredPost";
import Posts from "../../blogs/posts";
import PostCategories from "../../blogs/posts/postCategories";
import PostSortBy from "../../blogs/posts/postSortBy";
import EmptyPost from "../../EmptyPost";
import { useRouter } from "next/router";
import Loading from "../../Loading";

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

  const [ postsData, setPostsData ] = useState( [] );

  const [ postsDataDefault, setPostsDataDefault ] = useState( [] );
  
  const [ pageInfo, setPageInfo ] = useState( {
    "hasNext": false,
    "endCursor": "",
    "offsetPagination": {
      "total": 0
    }
  });

  const [category, setCategory] = useState(categories);
  const [pageSize, setPageSize] = useState(6);

  const [activeCat, setActiveCat] = useState(null);
  const [featured, setFeatured] = useState("");

  const [pageSearch, setPageSearch] = useState("");

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
  ] =
    activeCat === null
      ? useLazyQuery(featuredQuery(postType), {
          onCompleted: ( data ) =>{
            console.log('postsData', data)
            
            setPosts( data?.posts ?? [] );
          }
        })
      : useLazyQuery(postByCatQuery(postType), {
          onCompleted: ( data ) =>{
            console.log('lazy2')
            setPosts( data?.posts ?? [] );
          }
        });

  // console.warn('from lazy pageinfor', pageInfo);
  const { loading, error, data, refetch } = useQuery(getPostList(postType), {
    variables: { first: initPageSize, after: ""  },
    onCompleted: ( data ) =>{
      setPostsDefault( data?.posts ?? [] );
    }
  });

  const setPosts = ( posts ) => {
    if ( ! posts || ! posts?.edges ) {
      return;
    }

  const newPosts = postsData.concat( posts?.edges );
    setPostsData( newPosts );
    setPageInfo( { ...posts?.pageInfo } );
  };

  const setPostsDefault = ( posts ) => {
    if ( ! posts || ! posts?.edges ) {
      return;
    }

    const newPosts = postsDataDefault.concat( posts?.edges );
    setPostsDataDefault( newPosts );
    setPageInfo( { ...posts?.pageInfo } );
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

  return (
    <section
      className={
        `section section-blog-listing ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <Row>
          <Col md={4}>
            <aside>
              <input name="blogSearch" type="text" placeholder="Search" 
              onChange={ e =>
                {
                  
                  
                getPostByCat({ variables: {
                  filterCats: activeCat,
                  first: pageSize,
                  after: "",
                  field: featured === "DESC" ? "META_KEY" : "DATE",
                  pageSearch: e.target.value,
                } });

                setPageSearch(e.target.value); 
                setPostsData([]);
                
              }}/>
              <PostSortBy
                featuredStatus={featured}
                pageSearch={pageSearch}
                pageSize={pageSize}
                setFeatured={setFeatured}
                getPostByCat={getPostByCat}
                setPostsData={setPostsData}
                setActiveCat={setActiveCat}
                setPageInfo={setPageInfo}
                activeCat={activeCat}  
                postType={postType}
              />
              <PostCategories
                data={category}
                pageSize={pageSize}
                pageSearch={pageSearch}
                getPostByCat={getPostByCat}
                setPostsData={setPostsData}
                setActiveCat={setActiveCat}
                activeCat={activeCat}
                setPageInfo={setPageInfo}
                featuredStatus={featured}
                setFeatured={setFeatured}
                postType={postType}
              />
            </aside>
          </Col>
          <Col md={8}>
            { loading || lazyLoading ? (
              <div className="loading-wrapper d-flex justify-content-center h-100 align-items-center">
                <Loading />
              </div>
            ) : (
              <>
                {pageInfo?.offsetPagination?.total === 0 ? (
                  <EmptyPost errorMsg="Try different category simply clicking the left sidebar filter options." />
                ) : (
                  ""
                )}
                {pageInfo?.offsetPagination?.total!=0 && <Posts
                  posts={ postsData.length>0 ?  postsData : postsDataDefault ?? []}
                />}

                { pageInfo?.hasNextPage ? (
                  <div className="w-full flex justify-center lg:my-10">
                    { loading || lazyLoading ? (
                      <div className="flex justify-center w-full border border-white px-3 py-2 my-8">
                        Loading...
                      </div>
                    ) : (
                      <button
                        className="flex items-center cursor-pointer	bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-500 border border-gray-500 px-4 py-3"
                        onClick={ () => { 
                          // loadMoreItems( pageInfo?.endCursor ); 
                          refetch({
                            filterCats: activeCat,
                            first: pageSize,
                            after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                            field: featured === "DESC" ? "META_KEY" : "DATE",
                            pageSearch: pageSearch,
                          })

                          onRefetch({
                            filterCats: activeCat,
                            first: pageSize,
                            after: pageInfo?.endCursor ? pageInfo?.endCursor : "",
                            field: featured === "DESC" ? "META_KEY" : "DATE",
                            pageSearch: pageSearch,
                          })
                        } 
                      }
                      >
                        Load more
                      </button>
                    ) }
                  </div>
                ) : null }
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
