import Footer from "./footer";
import Header from "./header";
import Blocks from "./blocks";
import Head from "next/head";
import Seo from "../seo";
import { sanitize } from "../../utils/miscellaneous";

const Layout = ({ data, children }) => {
  // console.warn('page', data?.pageTitle);

  const careers = data?.careers?.careers;
  const blocks = data?.homeBlocks?.homeBlocks;
  const headerType =
    data?.headerLayout?.headerLayout?.headerLayout?.chooseHeaderType;
  const categories = data?.categories;
  const newsCategories = data?.newsCategories;
  const podcastsCategories = data?.podcastsCategories;
  const seo = data?.seo;
  const uri = data?.pageTitle?.uri;
  // console.warn(data.homeBlocks.homeBlocks);
  return (
    <div className="site-wrapper">
      <Seo seo={seo} uri={uri} />
      <Head>
        {seo?.schemaDetails ? (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{ __html: sanitize(seo.schemaDetails) }}
          />
        ) : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-PGGX9RT4P0"></script>
        <script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PGGX9RT4P0');
          `,
          }}
        />
      </Head>
      <Header
        headerType={headerType}
        headerLogos={data?.logos?.themeOptions?.themeSettings}
        headerMenus={data?.menus?.headerMenus}
      ></Header>
      <main>
        {children}
        {blocks
          ? blocks.map((block, index) => (
              <Blocks
                block={block}
                careers={careers}
                categories={categories}
                newsCategories={newsCategories}
                podcastsCategories={podcastsCategories}
                key={index}
              />
            ))
          : null}
      </main>
      <Footer
        footerSetting={data?.logos?.themeOptions?.themeSettings}
        footerMenus={data?.menus?.footerMenus}
        footerBottomMenu={data?.menus?.footerBottomMenus}
      ></Footer>
    </div>
  );
};

export default Layout;
