import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import { Container } from "react-bootstrap";
import Fancybox from "../../../plugins/FancyboxPlugin";
import CheckVideo from "../../checkVideo";

export default function VideoPopUpBanner(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const enable = attributesData.data.babylon_enable_section;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const bannerImg = attributesData.data.babylon_fwci_background_image;
  const bannerTitle = attributesData.data.babylon_fwci_title;
  const bannerText = attributesData.data.babylon_fwci_description;
  const bannerButton = attributesData.data.babylon_fwci_link;

  const style = {
    backgroundImage: `url(${bannerImg?.url})`,
  };

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

  if (bannerButton) {
    var videoUrl = CheckVideo(bannerButton.url);
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <section
      style={style}
      id="video-section"
      className={
        `section section-video-popup d-flex align-items-center ${
          padding ? padding : ""
        } ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <div
          className="section-content"
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          {bannerTitle ? <h2>{bannerTitle}</h2> : ""}
          {bannerText ? <div className="desc">{bannerText}</div> : ""}
          {videoUrl ? (
            <Fancybox
              options={{
                infinite: false,
              }}
            >
              {bannerButton ? (
                <div className="video-button-wrapper">
                  <Link href={bannerButton.url}>
                    <a data-fancybox="video-gallery" className="video-button">
                      <svg
                        width="98"
                        height="98"
                        viewBox="0 0 98 98"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M64.3125 49C64.3125 50.103 63.7194 51.1207 62.7598 51.6645L46.671 60.7815C43.6087 62.5168 39.8125 60.3047 39.8125 56.7848V41.2155C39.8125 37.6957 43.6086 35.4836 46.671 37.2188L62.7598 46.3356C63.7194 46.8793 64.3125 47.8971 64.3125 49ZM49 12.25C28.7035 12.25 12.25 28.7035 12.25 49C12.25 69.2965 28.7035 85.75 49 85.75C69.2965 85.75 85.75 69.2965 85.75 49C85.75 28.7035 69.2965 12.25 49 12.25ZM18.375 49C18.375 32.0863 32.0863 18.375 49 18.375C65.9137 18.375 79.625 32.0863 79.625 49C79.625 65.9137 65.9137 79.625 49 79.625C32.0863 79.625 18.375 65.9137 18.375 49Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Fancybox>
          ) : (
            <>
              {bannerButton ? (
                <div className="btn-wrapper">
                  <Link href={bannerButton.url}>
                    <a className="btn btn-light btn-lg">
                      {bannerButton.title ? bannerButton.title : "Read more"}
                    </a>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
