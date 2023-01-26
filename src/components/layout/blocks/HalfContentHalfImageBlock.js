import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import { Col, Container, Row } from "react-bootstrap";
import { sanitize } from "../../../utils/miscellaneous";
import CheckSvg from "../../checkSvg";

export default function HalfContentHalfImageBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData.data.babylon_enable_section;
  const imgPosition = attributesData.data.babylon_hchi_image_position;
  const image = attributesData.data.babylon_hchi_image;
  const title = attributesData.data.babylon_hchi_title;
  const desc = attributesData.data.babylon_hchi_description;
  const link = attributesData.data.babylon_hchi_link;
  const enableList = attributesData.data.babylon_hchi_enable_list;

  const lists = attributesData.data.babylon_hchi_list;
  const hasBg = attributesData.data.babylon_hchi_has_background;
  let hasGradientBg = "";
  if (hasBg === "1") {
    hasGradientBg = attributesData.data.has_gradient_background;
  }
  const listsItems = [];
  {
    for (let i = 0; i < lists; i++) {
      // let icon = 'babylon_hchi_list_'+ i +'_babylon_hchi_list_icon';
      listsItems.push({
        icon: attributesData.data[
          "babylon_hchi_list_" + i + "_babylon_hchi_list_icon"
        ],
        text: attributesData.data[
          "babylon_hchi_list_" + i + "_babylon_hchi_list_text"
        ],
      });
    }
  }
  // console.log(listsItems);
  // const style = {
  //   background: `url(${bannerImg.url}) right 24px center no-repeat, linear-gradient(180deg, #0038D2 0%, #002BA0 100%)`,
  // };

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }
  function hasBackground(bg) {
    if (bg === "1") {
      return `has-background `;
    }

    return "";
  }

  if (enable === "0") {
    return null;
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // const isHalfImageSvg = CheckSvg(image.url);
  // console.warn('img type', image);

  return (
    <section
      className={
        `section section-hchi ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        } ${hasGradientBg ? "has-gradient" : ""} ` +
        hasBackground(hasBg) +
        getClassName(align)
      }
    >
      <Container>
        <Row className="align-items-center">
          <Col
            md={6}
            className={`${imgPosition === "right" ? "order-md-last" : ""}`}
          >
            {image?.url ? (
              <figure
              // data-aos="fade-down"
              // data-aos-offset="100"
              // data-aos-duration="1500"
              // data-aos-once="true"
              >
                <CheckSvg item={image} />
              </figure>
            ) : (
              ""
            )}
          </Col>

          <Col
            md={6}
            className={`${imgPosition === "right" ? "order-md-first" : ""} ${
              hasBg === "1" ? "text-white" : ""
            }`}
          >
            <div
              className="content"
              data-aos="fade-down"
              data-aos-offset="100"
              data-aos-duration="1500"
              data-aos-once="true"
            >
              <h2>{title}</h2>
              <div
                className="desc"
                dangerouslySetInnerHTML={{ __html: sanitize(desc ?? {}) }}
              ></div>
              {link ? (
                <div className="btn-wrapper">
                  <Link href={link.url}>
                    <a
                      className={`btn ${
                        hasBg === "1" ? "btn-light" : "btn-secondary"
                      } btn-lg`}
                    >
                      {link.title}
                    </a>
                  </Link>
                </div>
              ) : (
                ""
              )}

              {listsItems.length && enableList >= 0 ? (
                <ul className="lists">
                  {listsItems.map((item, index) => {
                    return (
                      <li key={index} className="lists__item d-flex">
                        {item.icon?.url ? (
                          <figure className="list-icon">
                            <CheckSvg item={item?.icon} />
                          </figure>
                        ) : (
                          ""
                        )}
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
