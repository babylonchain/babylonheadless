import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import { Col, Container, Row } from "react-bootstrap";
import { sanitize } from "../../../utils/miscellaneous";
import CheckSvg from "../../checkSvg";

export default function MultipleColumnTextIconBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData?.data?.babylon_enable_section;
  const colType = attributesData?.data?.babylon_mctaic_choose_column_type;
  const sectionTitle = attributesData?.data?.babylon_mctaic_title;
  const sectionDesc = attributesData?.data?.babylon_mctaic_description;
  const section_title_alignment = attributesData?.data?.section_title_alignment;

  const lists = attributesData?.data?.babylon_mctaic_column_details;
  const hasBg = attributesData?.data?.babylon_mctaic_has_background;
  const listsItems = [];
  {
    for (let i = 0; i < lists; i++) {
      // let icon = 'babylon_mctaic_column_details'+ i +'_babylon_mctaic_column_detailsicon';
      listsItems.push({
        icon: attributesData.data[
          "babylon_mctaic_column_details_" + i + "_babylon_mctaic_cd_icon"
        ],
        title:
          attributesData.data[
            "babylon_mctaic_column_details_" + i + "_babylon_mctaic_cd_title"
          ],
        description:
          attributesData.data[
            "babylon_mctaic_column_details_" +
              i +
              "_babylon_mctaic_cd_description"
          ],
        link: attributesData.data[
          "babylon_mctaic_column_details_" + i + "_babylon_mctaic_cd_link"
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
  function getColType(type) {
    if (type === "two-column") {
      return 6;
    }
    if (type === "three-column") {
      return 4;
    }
    if (type === "four-column") {
      return 3;
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

  return (
    <section
      className={
        `section section-multi-col-ti ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        } ` +
        hasBackground(hasBg) +
        getClassName(align)
      }
    >
      <Container className={`text-white`}>
        { sectionTitle || sectionDesc ? 
        <div
          className={`section-title ${
            section_title_alignment ? " " + section_title_alignment : ""
          }`}
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          {sectionTitle ? (
            <h2
              className={`${
                section_title_alignment ? " " + section_title_alignment : ""
              }`}
            >
              {sectionTitle}
            </h2>
          ) : (
            ""
          )}
          {sectionDesc ? (
            <div
              className="section-desc"
              dangerouslySetInnerHTML={{ __html: sanitize(sectionDesc ?? {}) }}
            ></div>
          ) : (
            ""
          )}
        </div>
        : ''}
        {listsItems.length ? (
          <Row className="icon-boxs align-items-center">
            {listsItems.map((item, index) => {
              // console.warn(item);
              return (
                <Col
                  key={index}
                  md={getColType(colType)}
                  className="icon-boxs__item"
                  data-aos="fade-down"
                  data-aos-offset="100"
                  data-aos-duration="1500"
                  data-aos-once="true"
                >
                  <div className="box-content">
                    {item.icon?.url ? (
                      <figure className="list-icon">
                        <CheckSvg item={item.icon} />
                      </figure>
                    ) : (
                      ""
                    )}
                    <div className="icon-boxs__content">
                      {item.title ? <h5>{item.title}</h5> : ""}
                      {item.description ? (
                        <div className="desc">{item.description}</div>
                      ) : (
                        ""
                      )}

                      {item.link ? (
                        <div className="btn-wrapper">
                          <Link href={item.link.url}>
                            <a className={`link-icon text-white`}>
                              <span>
                                {item.link.title}
                                <svg
                                  width="7"
                                  height="10"
                                  viewBox="0 0 7 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1.5 1L5.5 5L1.5 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  ></path>
                                </svg>
                              </span>
                            </a>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : null}
      </Container>
    </section>
  );
}
