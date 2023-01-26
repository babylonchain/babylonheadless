import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import { Col, Container, Row } from "react-bootstrap";
import CheckSvg from "../../checkSvg";

export default function MeetTheTeamBlock({ attributes }) {
  const attributesData = JSON.parse(attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const enable = attributesData.data.babylon_enable_section;
  const sectionTitle = attributesData.data.babylon_meet_the_team_title;
  const countrylists = attributesData.data.babylon_meet_the_team_countries;
  const teamList = attributesData.data.babylon_meet_the_team_tm;
  const countries = [];
  {
    for (let i = 0; i < countrylists; i++) {
      countries.push({
        icon: attributesData.data[
          "babylon_meet_the_team_countries_" + i + "_babylon_meet_the_team_flag"
        ],
      });
    }
  }

  const teams = [];
  {
    for (let i = 0; i < teamList; i++) {
      teams.push({
        image:
          attributesData.data[
            "babylon_meet_the_team_tm_" + i + "_babylon_meet_the_team_tm_image"
          ],
        name: attributesData.data[
          "babylon_meet_the_team_tm_" + i + "_babylon_meet_the_team_tm_name"
        ],
        position:
          attributesData.data[
            "babylon_meet_the_team_tm_" +
              i +
              "_babylon_meet_the_team_tm_position"
          ],
        profileLink:
          attributesData.data[
            "babylon_meet_the_team_tm_" + i + "_social_profile_link"
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

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <section
      className={
        `section section-team-member ${padding ? padding : ""} ${
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
        <Row className="justify-content-center layout-m">
          <Col md={9}>
            {countries.length ? (
              <div
                className="country-lists d-flex flex-wrap align-items-center justify-content-center"
                data-aos="fade-down"
                data-aos-offset="100"
                data-aos-duration="1500"
                data-aos-once="true"
              >
                {countries.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="country-lists__item"
                      data-aos="fade-down"
                      data-aos-offset="100"
                      data-aos-duration="1500"
                      data-aos-once="true"
                    >
                      {item?.icon?.url != false ? (
                        <figure className="list-icon">
                          <CheckSvg item={item?.icon} />
                        </figure>
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
        {teams.length ? (
          <Row
            className="team-lists"
            data-aos="fade-down"
            data-aos-offset="100"
            data-aos-duration="1500"
            data-aos-once="true"
          >
            {teams.map((team, index) => {
              const { image, name, position, profileLink } = team;
              // console.warn(profileLink);
              return (
                <Col key={index} md={6} lg={4}>
                  <ConditionalWrapper
                    condition={profileLink}
                    wrapper={(children) => (
                      <a href={profileLink} title={name} target="_blank">
                        {children}
                      </a>
                    )}
                  >
                    <div className="team-lists__item">
                      {image ? (
                        <Image
                          src={image.url}
                          width={88}
                          height={88}
                          alt={image.alt ? image.alt : image.title}
                        />
                      ) : (
                        ""
                      )}

                      {name || position ? (
                        <div className="content">
                          {name ? <h3 className="name">{name}</h3> : ""}
                          {position ? (
                            <p className="position">{position}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </ConditionalWrapper>
                </Col>
              );
            })}
          </Row>
        ) : null}
      </Container>
    </section>
  );
}
