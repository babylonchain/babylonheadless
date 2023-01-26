import { useEffect } from "react";
import AOS from "aos";
import { Col, Container, Row } from "react-bootstrap";
import CheckSvg from "../../checkSvg";

export default function InvestorLogoCarouselBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData.data.babylon_enable_section;
  const sectionTitle = attributesData.data.babylon_section_title;

  const lists = attributesData.data.babylon_investor_logos;
  const listsItems = [];
  {
    for (let i = 0; i < lists; i++) {
      // let icon = 'babylon_mctaic_column_details'+ i +'_babylon_mctaic_column_detailsicon';
      listsItems.push({
        icon: attributesData.data[
          "babylon_investor_logos_" + i + "_babylon_investor_logo_icon"
        ],
        link: attributesData.data[
          "babylon_investor_logos_" + i + "_babylon_investor_logo_link"
        ],
      });
    }
  }

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
        `section section-logos ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        } ` + getClassName(align)
      }
    >
      <Container>
        <div
          className="section-title text-center"
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          {sectionTitle ? <h2>{sectionTitle}</h2> : ""}
        </div>
        <Row className="justify-content-center">
          <Col md={10}>
            {listsItems.length ? (
              <div
                className="logo-lists d-flex flex-wrap align-items-center justify-content-center"
                data-aos="fade-down"
                data-aos-offset="100"
                data-aos-duration="1500"
                data-aos-once="true"
              >
                {listsItems.map((item, index) => {
                  return (
                    <div key={index} className="logo-lists__item">
                      {item.icon ? (
                        <a
                          href={item.link.url ? item.link.url : "#"}
                          target={`${item.link.target ? item.link.target : ""}`}
                        >
                          <figure className="list-icon">
                            <CheckSvg item={item.icon} />
                          </figure>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
