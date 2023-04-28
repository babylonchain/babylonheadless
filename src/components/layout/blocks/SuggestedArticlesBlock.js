import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { sanitize } from "../../../utils/miscellaneous";
import Link from "next/link";

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

  return (
    (articles) ? <section
      className={
        `section section-blog-listing posts suggested-articles ${padding ? padding : ""} ${paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        {sectionTitle &&
          <div className="title-wrap">
            <h2 className="mb-0">{sectionTitle}</h2>
          </div>
        }
        <div className="blog-listing-wrap">
          <Row className="justify-content-center">
            {articles.map((article) => {
              return (
                <Col md={6} xl={4} key={article.ID}>
                  <article className="post-item">
                    <div className="post-thumbnail">
                      {article.post_full &&
                        <Link href={"/blogs/" + `${article?.post_slug}`}>
                          <a>
                            <figure>
                              <Image
                                src={article.post_full}
                                alt={article.post_title}
                                width={300}
                                height={200}
                              />
                            </figure>
                          </a>
                        </Link>
                      }
                    </div>
                    <div className="post-content">
                      <div className="post-content-body">
                        <div className="post-content-info d-flex">
                          <div className="date">
                            {article.post_date && article.post_date}
                          </div>
                        </div>
                        {article.post_title &&
                          <Link href={"/blogs/" + `${article?.post_slug}`}>
                            <a>
                              <h2>{article.post_title}</h2>
                            </a>
                          </Link>
                        }
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