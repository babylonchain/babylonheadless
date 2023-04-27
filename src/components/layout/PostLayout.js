import Footer from "./footer";
import Header from "./header";
import Blocks from "./blocks";
import Head from "next/head";
import Seo from "../seo";
import { sanitize } from "../../utils/miscellaneous";
import CareerApply from "./blocks/CareerApply";

const PostLayout = ({ data, detailsPage, children }) => {
  // console.warn('page', data);

  const careers = data?.careers?.careers;
  const blocks = data?.homeBlocks?.homeBlocks;
  const headerType = data?.headerLayout?.headerLayout?.headerLayout?.chooseHeaderType;
  const categories = data?.categories;
  const seo = data?.seo;
  const uri = data?.pageTitle?.uri;

  return (
    <div className={`site-wrapper ${detailsPage === "post" ? "blog-details" : ""}`}>
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
      <main
        className={`${detailsPage === "career" ? "career-details" : "blog-details"
          }`}
      >
        {children}

        {
          (() => {
            if (detailsPage !== "post") {
              return (
                blocks ? blocks.map((block, index) => (
                  <Blocks
                    block={block}
                    careers={careers}
                    categories={categories}
                    key={index}
                  />
                )) : null
              )
            }
          })()
        }

        {detailsPage === "career" ? <CareerApply data={data} /> : ""}
      </main>
      <Footer
        footerSetting={data?.logos?.themeOptions?.themeSettings}
        footerMenus={data?.menus?.footerMenus}
        footerBottomMenu={data?.menus?.footerBottomMenus}
      ></Footer>
    </div>
  );
};

export default PostLayout;
