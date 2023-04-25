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
import Image from "next/image";

export default function SuggestedArticlesBlock({
  attributes
}) {
  const router = useRouter();
  const attributesData = JSON.parse(attributes);
  // console.warn(podcastsCategories);
  const align = attributesData?.align;
  const enable = attributesData?.data?.babylon_enable_section;
  const postType = attributesData?.data?.choose_post_type;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;

  const sectionTitle = attributesData?.data?.section_title;

  const articles = attributesData?.data?.articles ? attributesData?.data?.articles?.postData : null;

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

console.log("attributesData", attributesData?.data)
  return (
    (articles) ? <section
      className={
        `section section-blog-listing ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <Row>
          { articles.map((article)=>{
            return <Col  md={4} key={article.ID}>
              { article.post_title && <h3>{article.post_title}</h3>}
              { article.post_date && <p>{article.post_date}</p>}
              { article.post_full && <Image
                src={article.post_full}
                alt={article.post_title}
                width={300}
                height={200}
              />}
              { article.post_excerpt && <p>{article.post_excerpt}</p>}
            </Col>
          })}
        </Row>
      </Container>
    </section>
    :
    <></>
  );
}