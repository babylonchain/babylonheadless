import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { sanitize } from "../../../utils/miscellaneous";

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

  console.log()

  console.log("attributesData", attributesData?.data)
  return (
    (articles) ? <section
      className={
        `section section-blog-listing posts ${padding ? padding : ""} ${paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <div className="blog-listing-wrap">
          <Row>
            {articles.map((article) => {
              return (
                <Col md={4} key={article.ID}>
                  <article className="post-item">
                    <div className="post-thumbnail">
                      {article.post_full && <Image
                        src={article.post_full}
                        alt={article.post_title}
                        width={300}
                        height={200}
                      />}
                    </div>
                    <div className="post-content">
                      <div className="post-content-body">
                        <div className="date">
                          {article.post_date && article.post_date}
                        </div>
                        {article.post_title && <h2>{article.post_title}</h2>}
                        <div>
                          {article.post_excerpt && <div
                            dangerouslySetInnerHTML={{ __html: sanitize(article.post_excerpt ?? "").substring(0, 120) + '...' }}
                          />}
                        </div>
                      </div>
                    </div>
                  </article>
                </Col>
              )
            })}
          </Row>
        </div>
      </Container>
    </section>
      :
      <></>
  );
}