import { useEffect } from "react";
import AOS from "aos";
import { Col, Container, Row, Breadcrumb } from "react-bootstrap";
import parseHtml from "../../../lib/parser";
import { useRouter } from "next/router";
import GravityForm from "react-gravity-form";
import { isEmpty } from "lodash";

export default function ApplyFormBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData?.data?.babylon_enable_section;
  const choose_form = attributesData?.data?.choose_form;

  const router = useRouter();

  // console.warn(router);

  const {
    query: {
      listingPageTitle,
      listingPageUri,
      employmentType,
      location,
      pageTitle,
      excerpt,
    },
  } = router;

  const props = {
    listingPageTitle,
    listingPageUri,
    employmentType,
    location,
    pageTitle,
    excerpt,
  };
  // console.warn(props);

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (isEmpty(pageTitle)) {
      return window.location.replace("/careers");
    }
  }, []);

  return (
    <section
      className={
        `section section-apply-from ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        } ` + getClassName(align)
      }
    >
      <Container>
        {props.pageTitle ? (
          <Row className="justify-content-center">
            <Col xs={10}>
              <div className="react-breadcrum">
                <Breadcrumb>
                  <Breadcrumb.Item href={props.listingPageUri}>
                    {props.listingPageTitle ? props.listingPageTitle : "Career"}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{props.pageTitle}</Breadcrumb.Item>
                  {props.location || props.employmentType ? (
                    <>
                      {props.location ? (
                        <Breadcrumb.Item active className="meta-item">
                          {location}
                        </Breadcrumb.Item>
                      ) : (
                        ""
                      )}
                      {props.employmentType ? (
                        <Breadcrumb.Item active className="meta-item">
                          {props.employmentType}
                        </Breadcrumb.Item>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Breadcrumb>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="empty-state">
            <div className="empty-state__content">
              <div className="empty-state__help">
                Redirecting ... ! Please choose at least one career position.
              </div>
            </div>
          </div>
        )}
      </Container>
      {props.pageTitle || props.excerpt ? (
        <div className="section section-text-block p-medium  has-gradient has-background text-center text-white">
          <Container>
            <Row className="justify-content-center">
              <Col md={11}>
                <div
                  className="content"
                  data-aos="fade-down"
                  data-aos-offset="100"
                  data-aos-duration="1500"
                  data-aos-once="true"
                >
                  <h2>{props.pageTitle}</h2>
                  <div className="desc">{parseHtml(props.excerpt)}</div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        ""
      )}
      {props.pageTitle != undefined && choose_form ? (
        <div className="section section-apply-form p-medium">
          <Container>
            <div className="form-wrapper">
              <GravityForm
                backendUrl={`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/babylon/v1/gf/forms`}
                formID={choose_form}
                populatedFields={{
                  career_position_title: listingPageTitle
                    ? listingPageTitle
                    : "",
                }}
              />
            </div>
          </Container>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
