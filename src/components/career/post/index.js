import React, { useEffect, useState } from "react";
import Link from "next/link";
import { compareAsc, format } from "date-fns";
import { sanitize } from "../../../utils/miscellaneous";
import { Row, Col } from "react-bootstrap";
import AOS from "aos";
import RightArrow from "../../Icons/rightArrow";

const Post = ({ post }) => {
  // console.warn(post);
  const postDate = format(new Date(post?.date), "dd MMMM");
  const empType = post?.careerPositionDetails?.positionDetailsEmploymentType;
  const location = post?.careerPositionDetails.positionDetailsLocation;
  // console.warn("loca", empType);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <article className="career-list__item border border-secondary border-bottom-0">
      <Row className="">
        <Col xs={4} md={2}>
          <div className="post-meta bg-secondary text-white h-100 d-flex align-items-center justify-content-center">
            {postDate ? <span className="date">{postDate}</span> : ""}
          </div>
        </Col>
        <Col xs={8} md={9} lg={8}>
          <div className="post-content content-border">
            <Link href={`${post?.uri}`}>
              <a>
                <h3
                  className="font-bold mb-2 text-lg hover:text-blue-500"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(post?.title ?? ""),
                  }}
                />
              </a>
            </Link>
          </div>
          <div className="post-meta-footer">
            {location ? (
              <>
                <span className="employment-location">{location}</span>
              </>
            ) : (
              ""
            )}
            {empType ? (
              <>
                <span className="employment-type">{empType}</span>
              </>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col xs={8} md={1} lg={2} className="ms-auto fwd-arrow">
          <Link className="read-more" href={`${post?.uri}`}>
            <a>
              <RightArrow />
            </a>
          </Link>
        </Col>
      </Row>
    </article>
  );
};

export default Post;
