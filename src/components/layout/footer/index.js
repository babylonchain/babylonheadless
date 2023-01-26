import Link from "next/link";
import { isEmpty } from "lodash";
import { Container, Row, Col } from "react-bootstrap";
import MenuItem from "../header/menuItem";

const Footer = ({ footerSetting, footerMenus, footerBottomMenu }) => {
  if (
    isEmpty(footerSetting) &&
    isEmpty(footerMenus) &&
    isEmpty(footerBottomMenu)
  ) {
    return null;
  }
  const footerLogoUrl = footerSetting.babylonFooterLogo.mediaItemUrl;
  const footerLogoAlt = footerSetting.babylonFooterLogo.altText
    ? footerSetting.babylonFooterLogo.altText
    : footerSetting.babylonFooterLogo.title;
  const copyrightText = footerSetting.starterKitCopyrightText;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {footerSetting.starterKitSocialNetworkSettings.length ? (
        <div className="footer-top">
          <Container>
            <ul className="social-icons d-flex align-items-center justify-content-center">
              {footerSetting?.starterKitSocialNetworkSettings.map(
                (item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.starterKitSocialNetworkSettingsUrl}>
                        <a target="_blank">
                          <img
                            src={
                              item.starterKitSocialNetworkSettingsIcon
                                .mediaItemUrl
                            }
                            alt={
                              item.starterKitSocialNetworkSettingsIcon.altText
                                ? item.starterKitSocialNetworkSettingsIcon
                                    .altText
                                : item.starterKitSocialNetworkSettingsIcon.title
                            }
                          />
                        </a>
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </Container>
        </div>
      ) : null}
      <div className="footer-middle">
        <Container>
          <Row className="align-items-center">
            <Col lg={3}>
              <div className="footer-logo text-center text-lg-start">
                <img src={footerLogoUrl} alt={footerLogoAlt} />
              </div>
            </Col>
            <Col lg={9}>
              <nav className="footer-middle-nav d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
                {footerMenus.length ? (
                  <ul className="d-flex flex-column flex-xl-row">
                    {footerMenus.map((item) => {
                      // console.warn(item);
                      return (
                        // <Link key={item.node.id} href={item.node.uri}>
                        //   <a>{item.node.label}</a>
                        // </Link>
                        <MenuItem key={item.node.id} item={item} />
                      );
                    })}
                  </ul>
                ) : null}
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <div className="copyright">
                  {copyrightText
                    ? copyrightText
                    : `© ${currentYear} BABYLON. ALL RIGHTS RESERVED.`}
                </div>
                <nav className="footer-bottom-nav d-flex flex-wrap align-items-center ">
                  {footerBottomMenu.length
                    ? footerBottomMenu.map((item) => {
                        // console.warn(item);
                        return (
                          <Link key={item.node.id} href={item.node.uri}>
                            <a>{item.node.label}</a>
                          </Link>
                        );
                      })
                    : null}
                </nav>
              </div>
            </Col>
            <Col lg={4}>
              <div className="site-by text-center text-lg-end">
                <Link href="https://ebpearls.com.au/website-design-sydney/">
                  <a target="_blank">
                    Web Design by <span>ebPearls</span>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
