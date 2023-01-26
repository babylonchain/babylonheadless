import { useEffect } from "react";
import AOS from "aos";
import { Col, Container, Row, Breadcrumb } from "react-bootstrap";
import GravityForm from "react-gravity-form";
import Link from "next/link";

export default function ContactFormBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  //   console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData?.data?.babylon_enable_section;
  const choose_form = attributesData?.data?.choose_form;
  const address =
    attributesData?.data
      ?.babylon_sidebar_content_babylon_sidebar_content_address;
  const phoneNo =
    attributesData?.data
      ?.babylon_sidebar_content_babylon_sidebar_content_contact;
  const email =
    attributesData?.data?.babylon_sidebar_content_babylon_sidebar_content_email;
  const title =
    attributesData?.data?.babylon_sidebar_content_babylon_sidebar_content_title;

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

  return (
    <section
      className={
        `section section-contact-from ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        } ` + getClassName(align)
      }
      data-aos="fade-down"
      data-aos-offset="100"
      data-aos-duration="1500"
      data-aos-once="true"
    >
      <Container>
        <Row>
          <Col md={5}>
            <aside className="contact-sidebar">
              {title ? <h3>{title}</h3> : ""}
              {address ? (
                <p className="contact-item">Address: {address}</p>
              ) : (
                ""
              )}
              {phoneNo ? (
                <p className="contact-item">Contact: <Link href={`tel:${phoneNo}`}>{phoneNo}</Link></p>
              ) : (
                ""
              )}
              {email ? (
                <p className="contact-item">
                  Email: <Link href={`mailto:${email}`}>{email}</Link>
                </p>
              ) : (
                ""
              )}
            </aside>
          </Col>
          <Col md={7}>
            {choose_form ? (
              <div className="form-wrapper">
                <GravityForm
                  backendUrl={`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/babylon/v1/gf/forms`}
                  formID={choose_form}
                />
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
