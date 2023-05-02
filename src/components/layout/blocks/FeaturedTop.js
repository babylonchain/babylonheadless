import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { sanitize } from "../../../utils/miscellaneous";
import Link from "next/link";

export default function FeaturedTop({ attributes, alllink }) {
  const attributesData = JSON.parse(attributes);
  // console.warn(podcastsCategories);
  const align = attributesData?.align;
  const enable = attributesData?.data?.babylon_enable_section;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const featured = attributesData?.data?.featured_post?.postData
    ? attributesData?.data?.featured_post?.postData
    : null;

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

  return featured ? (
    <section
      className={
        `section featured-post ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <h2 className="title featured">Featured</h2>
        <div className="featured-post-wrap">
          <Row>
            <Col lg={6}>
              <div className="image-wrap">
                {featured[0]?.post_full && (
                  <Link href={`${featured[0]?.post_slug}`}>
                    <a>
                      <figure>
                        <Image
                          src={featured[0]?.post_full}
                          alt={featured[0]?.post_title}
                          width={300}
                          height={200}
                        />
                      </figure>
                    </a>
                  </Link>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <div className="info-wrap">
                <div className="info-wrap-top">
                  <div className="meta-info d-flex">
                    <div className="date">{featured[0]?.post_date}</div>
                    {/* <div className="read-time">5 min read</div> */}
                  </div>
                  <Link href={`${featured[0]?.post_slug}`}>
                    <a>
                      <h2 className="title">{featured[0]?.post_title}</h2>
                    </a>
                  </Link>
                  <div>
                    {featured[0]?.post_excerpt && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            sanitize(featured[0]?.post_excerpt ?? "").substring(
                              0,
                              120
                            ) + "...",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="categories">
                  <ul>
                    <li>
                      <span>Featured</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  ) : (
    <></>
  );
}
