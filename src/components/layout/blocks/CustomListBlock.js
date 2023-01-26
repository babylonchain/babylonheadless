import { useEffect } from "react";
import AOS from "aos";
import { Col, Container, Row } from "react-bootstrap";
import parseHtml from "../../../lib/parser";

export default function CustomListBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData?.data?.babylon_enable_section;
  const sectionTitle = attributesData?.data?.section_title;

  const lists = attributesData?.data?.lists;

  const listsItems = [];
  {
    for (let i = 0; i < lists; i++) {
      // let icon = 'babylon_mctaic_column_details'+ i +'_babylon_mctaic_column_detailsicon';
      listsItems.push({
        title: attributesData.data["lists_" + i + "_title"],
        description: attributesData.data["lists_" + i + "_content"],
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
        `section section-custom-list ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        } ` + getClassName(align)
      }
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            <div
              className={`section-title`}
              data-aos="fade-down"
              data-aos-offset="100"
              data-aos-duration="1500"
              data-aos-once="true"
            >
              {sectionTitle ? <h2>{sectionTitle}</h2> : ""}
            </div>
            {listsItems.length ? (
              <div
                className="lists"
                data-aos="fade-down"
                data-aos-offset="100"
                data-aos-duration="1500"
                data-aos-once="true"
              >
                {listsItems.map((item, index) => {
                  // console.warn('test', item);
                  let desc = item.description.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br/>"
                  );
                  // desc = desc.replace(/^\s+/g, '&nbsp;');
                  return (
                    <div key={index} className="lists__item">
                      <div className="box-content">
                        <div className="index">
                          <span>{index + 1}</span>
                        </div>
                        <div className="icon-boxs__content">
                          {item.title ? <h3>{item.title}</h3> : ""}
                          {item.description ? (
                            <div className="desc">{parseHtml(desc)}</div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
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
