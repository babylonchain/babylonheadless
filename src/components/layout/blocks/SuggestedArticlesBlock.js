import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

export default function SuggestedArticlesBlock({
  attributes
}) {
  const attributesData = JSON.parse(attributes);
  // console.warn(podcastsCategories);
  const align = attributesData?.align;
  const enable = attributesData?.data?.babylon_enable_section;
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
        `section section-blog-listing posts ${padding ? padding : ""} ${
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