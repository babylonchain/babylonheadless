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
import Posts from "../../blogs/posts";
import Pagination from "react-bootstrap/Pagination";
import NextSvg from "../../Icons/nextSvg";
import PrevSvg from "../../Icons/prevSvg";
import Categories from "../../blogs/posts/categories";
import SortBy from "../../blogs/posts/sortBy";
import EmptyPost from "../../EmptyPost";
import { useRouter } from "next/router";
import Loading from "../../Loading";

export default function BlogListingBlock({
  attributes,
  categories,
  newsCategories,
  podcastsCategories,
}) {
  const router = useRouter();
  const attributesData = JSON.parse(attributes);
  // console.warn(podcastsCategories);
  const align = attributesData?.align;
  const enable = attributesData?.data?.babylon_enable_section;
  const postType = attributesData?.data?.choose_post_type;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;

  const [category, setCategory] = useState(categories);
  const [pageSize, setPageSize] = useState(6);
  const [pageOffset, setPageOffset] = useState(0);

  const [activeCat, setActiveCat] = useState(null);
  const [featured, setFeatured] = useState("");

  const [pageActive, setPageActive] = useState(1);

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

  const [
    getPostByCat,
    { loading: lazyLoading, called: lazyCaled, data: lazy },
  ] =
    activeCat === null
      ? useLazyQuery(featuredQuery(postType), {
          variables: {
            pageSize: pageSize,
            pageOffset: pageOffset,
            field: featured === "DESC" ? "META_KEY" : "DATE",
          },
        })
      : useLazyQuery(postByCatQuery(postType), {
          variables: {
            filterCats: activeCat,
            pageSize: pageSize,
            pageOffset: pageOffset,
            field: featured === "DESC" ? "META_KEY" : "DATE",
          },
        });

  // console.warn('from lazy', lazy);

  const { loading, error, data } = useQuery(getPostList(postType), {
    variables: { pageSize: pageSize, pageOffset: pageOffset },
  });

  // console.warn("news", data);

  const queryPaginateTotal =
    lazy?.posts?.pageInfo?.offsetPagination?.total ||
    lazy?.posts?.pageInfo?.offsetPagination?.total === 0
      ? lazy?.posts?.pageInfo?.offsetPagination?.total
      : data?.posts?.pageInfo?.offsetPagination?.total;
  // console.warn('page size', queryPaginateTotal);

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

  const handlePagiClick = (numb) => {
    setPageActive(numb);
    setPageOffset(numb * pageSize - pageSize);
  };

  const handlePrevClick = () => {
    if (pageActive === 1) return;
    setPageActive((preVal) => {
      setPageOffset((preVal - 1) * pageSize - pageSize);
      return preVal - 1;
    });
  };

  const handleNextClick = () => {
    // console.log('total', queryPaginateTotal);
    if (Math.ceil(queryPaginateTotal / pageSize) === pageActive) return;
    const newActive = setPageActive((preVal) => {
      setPageOffset((preVal + 1) * pageSize - pageSize);
      return preVal + 1;
    });
  };
  // Pagination items\
  const totalPages = Math.ceil(queryPaginateTotal / pageSize);
  let items = [];

  if (totalPages > 6) {
    items.push(
      <Pagination.Item
        key={1}
        active={1 === pageActive}
        onClick={() => handlePagiClick(1)}
      >
        1
      </Pagination.Item>
    );
    const midpoint = Math.ceil(totalPages / 2);

    if (pageActive > 1 && pageActive < midpoint) {
      items.push(
        <Pagination.Item
          key={pageActive}
          active={pageActive === pageActive}
          onClick={() => handlePagiClick(pageActive)}
        >
          {pageActive}
        </Pagination.Item>
      );
    }

    items.push(<Pagination.Ellipsis />);

    for (let number = midpoint; number <= midpoint + 4; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageActive}
          onClick={() => handlePagiClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    items.push(<Pagination.Ellipsis />);

    if (pageActive > midpoint + 4 && pageActive < totalPages) {
      items.push(
        <Pagination.Item
          key={pageActive}
          active={pageActive === pageActive}
          onClick={() => handlePagiClick(pageActive)}
        >
          {pageActive}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === pageActive}
        onClick={() => handlePagiClick(1)}
      >
        {totalPages}
      </Pagination.Item>
    );
  } else {
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageActive - 1}
          onClick={() => handlePagiClick(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
  }
  useEffect(() => {
    setFeatured("");
    setActiveCat(null);
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
        `section section-blog-listing ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <Row>
          <Col md={4}>
            <aside>
              <SortBy
                featuredStatus={featured}
                setFeatured={setFeatured}
                getPostByCat={getPostByCat}
                setPageActive={setPageActive}
                setPageOffset={setPageOffset}
                setActiveCat={setActiveCat}
                activeCat={activeCat}
                postType={postType}
              />
              <Categories
                data={category}
                getPostByCat={getPostByCat}
                setActiveCat={setActiveCat}
                activeCat={activeCat}
                setPageActive={setPageActive}
                setPageOffset={setPageOffset}
                featuredStatus={featured}
                setFeatured={setFeatured}
                postType={postType}
              />
            </aside>
          </Col>
          <Col md={8}>
            {loading || lazyLoading ? (
              <div className="loading-wrapper d-flex justify-content-center h-100 align-items-center">
                <Loading />
              </div>
            ) : (
              <>
                {lazy?.posts?.pageInfo?.offsetPagination?.total === 0 ? (
                  <EmptyPost errorMsg="Try different category simply clicking the left sidebar filter options." />
                ) : (
                  ""
                )}
                <Posts
                  posts={lazy ? lazy?.posts?.edges : data?.posts?.edges ?? []}
                />
                {/* {queryPaginateTotal} */}
                {queryPaginateTotal > 0 &&
                  Math.ceil(queryPaginateTotal / pageSize) > 1 && (
                    <Pagination className="md-webinar__pagination">
                      <span className="prev-btn" onClick={handlePrevClick}>
                        <PrevSvg />
                      </span>
                      {items}
                      <span className="next-btn" onClick={handleNextClick}>
                        <NextSvg />
                      </span>
                    </Pagination>
                  )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
