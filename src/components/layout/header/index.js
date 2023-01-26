import { useState, useEffect } from "react";
import { first, isEmpty } from "lodash";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { FiMenu, FiX } from "react-icons/fi";
import MenuItem from "./menuItem";
import { useRouter } from "next/router";

const Header = ({ headerType, headerLogos, headerMenus }) => {
  if (isEmpty(headerLogos) && isEmpty(headerMenus)) {
    return null;
  }
  const router = useRouter();
  const imgeWhiteUrl = headerLogos?.starterKitHeaderLogoOne?.mediaItemUrl;
  const imgeWhiteAlt = headerLogos?.starterKitHeaderLogoOne?.altText
    ? headerLogos?.starterKitHeaderLogoOne?.altText
    : headerLogos?.starterKitHeaderLogoOne?.title;
  const imgeDarkUrl = headerLogos?.starterKitHeaderLogoTwo?.mediaItemUrl;
  const imgeDarkAlt = headerLogos?.starterKitHeaderLogoTwo?.altText
    ? headerLogos?.starterKitHeaderLogoTwo?.altText
    : headerLogos?.starterKitHeaderLogoTwo?.title;

  let logoUrl = "";
  

  if (headerType === "dark" && !isEmpty(imgeWhiteUrl)) {
    logoUrl = imgeWhiteUrl;
  } else if (
    headerType === "dark" &&
    isEmpty(imgeWhiteUrl) &&
    !isEmpty(imgeDarkUrl)
  ) {
    logoUrl = imgeDarkUrl;
  } else if (headerType === "light" && !isEmpty(imgeDarkUrl)) {
    logoUrl = imgeDarkUrl;
  } else if (
    headerType === "light" &&
    isEmpty(imgeDarkUrl) &&
    !isEmpty(imgeWhiteUrl)
  ) {
    logoUrl = imgeWhiteUrl;
  } else {
    logoUrl = "";
  }
  // console.warn(imgeDarkUrl );
  // console.warn('url', logoUrl );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath])
  

  return (
    <header className={`header header--${headerType}`}>
      <Container>
        <div className="header-inner d-flex flex-wrap align-items-center">
          <div className="logo-wrapper">
            {logoUrl ? (
              <Link href="/">
                <a>
                  <img src={logoUrl} alt={imgeWhiteAlt} />
                </a>
              </Link>
            ) : (
              <h1 className="h3">BABYLON</h1>
            )}
          </div>
          <button
            title="Menu open button"
            className="nav-opener ms-auto d-xl-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <nav
            className={`header-nav ms-xl-auto ${menuOpen ? "menu-open" : ""}`}
          >
            {headerMenus.length ? (
              <ul className="d-flex flex-column flex-xl-row">
                {headerMenus.map((item) => {
                  return <MenuItem key={item.node.id} item={item} />;
                })}
              </ul>
            ) : null}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
