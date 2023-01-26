import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Router from "next/router";
function CareerApply({ data }) {
  const listingPageTitle =
    data?.logos?.themeOptions?.themeSettings?.chooseCareerPage?.title;
  const listingPageUri =
    data?.logos?.themeOptions?.themeSettings?.chooseCareerPage?.uri;

  const applyPage =
    data?.logos?.themeOptions?.themeSettings?.chooseApplicationPage;

  const employmentType =
    data?.postMeta?.positionDetails?.positionDetailsEmploymentType;
  const location = data?.postMeta?.positionDetails?.positionDetailsLocation;

  const pageTitle = data?.pageTitle?.pageTitle;
  const excerpt = data?.pageTitle?.excerpt;
  // const pageTitle = data?.pageTitle?.pageTitle;
  // console.warn('from btn', meta);

  const name = "test";

  function sendProps() {
    Router.push(
      {
        pathname: "/apply-now",
        query: {
          listingPageTitle,
          listingPageUri,
          employmentType,
          location,
          pageTitle,
          excerpt,
        },
      },
      "/apply-now"
    );
  }

  return (
    <div className="section section-apppy-btn pt-0">
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            <a className="btn btn-secondary" onClick={() => sendProps()}>
              Apply Now{" "}
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CareerApply;
