import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import { Container } from "react-bootstrap";
import Fancybox from "../../../plugins/FancyboxPlugin";
import CheckVideo from "../../checkVideo";

export default function BannerBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const align = attributesData.align;
  const enable = attributesData.data.babylonEnableSection;
  const bannerImg = attributesData.data.babylon_home_banner_image;
  const bannerTitle = attributesData.data.babylon_home_banner_title;
  const bannerText = attributesData.data.babylon_home_banner_text;
  const bannerButton = attributesData.data.babylon_home_banner_button;

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

  if (bannerButton) {
    var videoUrl = CheckVideo(bannerButton.url);
  }

  var hash = bannerButton.url.split("#")[1];

  function handleBtn() {
    hash ? document.getElementById(hash).scrollIntoView({ behavior: 'smooth' }) : '';
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <section
      className={
        "section-banner d-flex align-items-center " + getClassName(align)
      }
    >
      <Container>
        {bannerImg?.url ? (
          <figure className="banner-image">
            <img
              src={bannerImg.url}
              alt={bannerImg.alt ? bannerImg.alt : bannerImg.title}
            />
          </figure>
        ) : (
          ""
        )}

        <div
          className="section-content"
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          {bannerTitle ? <h1>{bannerTitle}</h1> : ""}
          {bannerText ? <p className="h3">{bannerText}</p> : ""}
          {videoUrl ? (
            <Fancybox
              options={{
                infinite: false,
              }}
            >
              {bannerButton ? (
                <div className="btn-wrapper">
                  <Link href={bannerButton.url}>
                    <a
                      data-fancybox="video-gallery"
                      className="btn btn-light btn-lg"
                    >
                      {bannerButton.title}
                    </a>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Fancybox>
          ) : (
            <>
              {hash ? (
                <div className="btn-wrapper">
                    <span onClick={handleBtn} className="btn btn-light btn-lg">{bannerButton.title}</span>
                </div>
              ) : (
                <div className="btn-wrapper">
                  <Link href={bannerButton.url}>
                    <a className="btn btn-light btn-lg">{bannerButton.title}</a>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
