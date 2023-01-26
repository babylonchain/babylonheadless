import client from "../src/apollo/client";
import { isEmpty } from "lodash";
import { GET_PAGES_URI } from "../src/queries/pages/get-pages";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../src/utils/slug";
import { GET_PAGE } from "../src/queries/pages/get-page";
import { useRouter } from "next/router";
import Layout from "../src/components/layout";
import { Container } from "react-bootstrap";
const Page = ({ data }) => {
  const router = useRouter();

  // console.warn(router.asPath);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout data={data}>
      <section className="section-page-title">
        <Container>
          <div className="page-title">
            <h1 className="h2">{data.pageTitle.pageTitle}</h1>
          </div>
        </Container>
      </section>
      {/* <div dangerouslySetInnerHTML={{__html: sanitize( data?.page?.content ?? {} )}}/> */}
    </Layout>
  );
  // return ('page')
};

export default Page;

export async function getStaticProps({ params }) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
    },
  });

  const headerLayout = data?.headerLayout;
  const themeOptions = data?.themeOptions;
  const headerMenus = data?.headerMenus?.edges;
  const footerMenus = data?.footerMenus?.edges;
  const footerBottomMenus = data?.footerBottomMenus?.edges;
  const homeBlocks = data?.page?.blocks;
  const pageTitle = data?.page?.title;
  const uri = data?.page?.uri;
  const seo = data?.page?.seo;
  const careers = data?.careers?.nodes;
  const categories = data?.categories?.nodes;
  const newsCategories = data?.newsCategories?.nodes;
  const podcastsCategories = data?.podcastsCategories?.nodes;
  // console.warn(categories);

  const defaultProps = {
    props: {
      data: {
        headerLayout: {
          headerLayout,
        },
        logos: {
          themeOptions,
        },
        pageTitle: {
          pageTitle,
          uri,
        },
        seo,
        homeBlocks: {
          homeBlocks,
        },
        careers: {
          careers,
        },
        categories,
        newsCategories,
        podcastsCategories,
        menus: {
          headerMenus,
          footerMenus,
          footerBottomMenus,
        },
      },
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };

  return handleRedirectsAndReturnData(defaultProps, data, errors, "page");
}

export async function getStaticPaths() {
  const { loading, error, data } = await client.query({
    query: GET_PAGES_URI,
  });
  //   console.warn('data', data);
  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map((page) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        // if ( ! isEmpty( page?.uri ) ) {
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { slug: slugs } });
        // console.warn('path', slugs);
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
