import client from "../../src/apollo/client";
import { isEmpty } from "lodash";
import { GET_PODCASTS_SLUGS } from "../../src/queries/podcast/get-podcasts";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import { GET_PODCAST_SINGLE } from "../../src/queries/podcast/get-podcast-single";
import { useRouter } from "next/router";
import PostLayout from "../../src/components/layout/PostLayout";
import { Container, Row, Col } from "react-bootstrap";
import BackArrow from "../../src/components/Icons/backArrow";
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PostMeta from "../../src/components/blogs/post/PostMeta";
import SharePage from "../../src/components/SharePage";
import CustomImage from "../../src/components/image";
import Figure from "react-bootstrap/Figure";
import Blocks from "../../src/components/layout/blocks/index";
import { GET_RECENT_PODCASTS } from "../../src/queries/podcast/get-recentPodcast";
import { useQuery } from "@apollo/client";
import RecentBlogs from "../../src/components/blogs/post/recentBlogs";
import SuggestedArticlesBlock from "../../src/components/layout/blocks/SuggestedArticlesBlock";
import Image from "next/image";
import { sanitize } from "../../src/utils/miscellaneous";

const Podcasts = ({ data }) => {
  const router = useRouter();
  const pageId = data?.pageInfo?.pageId;

  const listingPage =
    data?.logos?.themeOptions?.themeSettings?.choosePodcastListingPage;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const getRecentPostList = (postType) => {
    return GET_RECENT_PODCASTS;
  };

  const {
    loading,
    error,
    data: recentData,
  } = useQuery(getRecentPostList("posts"), {
    variables: { first: 3, notIn: [pageId] },
  });

  const recentBlogs = recentData?.posts?.edges
    ? recentData?.posts?.edges
    : null;

  const blocks = data?.homeBlocks?.homeBlocks;
  const getTerms = data?.terms?.pageTerms;
  const fImage = data?.pImage?.pageImage?.node;

  return (
    <PostLayout data={data} detailsPage={"post"}>
      <section className="section-breadcrumb">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href={listingPage ? listingPage.uri : ""}>
              Podcasts and Talks
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <span
                dangerouslySetInnerHTML={{
                  __html: sanitize(data.pageTitle.pageTitle ?? ""),
                }}
              />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
      <section className="section-page-title post-single">
        <Container>
          <div className="page-title-wrap">
            <Row>
              <Col lg={6}>
                <div className="page-title">
                  <div className="categories">
                    {getTerms &&
                      getTerms.map((term, index) => {
                        return <span key={index}>{term?.name}</span>;
                      })}
                  </div>
                  <h1
                    className="h2 mb-0"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(data.pageTitle.pageTitle ?? ""),
                    }}
                  />
                  <PostMeta data={data?.postMeta} />
                </div>
              </Col>
              <Col lg={6}>
                <div className="featured-image">
                  {fImage ? (
                    <Image
                      src={fImage?.mediaItemUrl}
                      width={300}
                      height={200}
                      alt={fImage.alt ? fImage.alt : fImage.title}
                    />
                  ) : (
                    <Figure.Image
                      width={300}
                      height={200}
                      alt="160x160"
                      src="data:image/svg+xml,%0A%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_18460ebac82 text %7B fill:%23999;font-weight:normal;font-family:var(--bs-font-sans-serif), monospace;font-size:10pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_18460ebac82'%3E%3Crect width='160' height='160' fill='%23373940'%3E%3C/rect%3E%3Cg%3E%3Ctext x='60.8203125' y='94.8'%3E160x160%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="section-post-body post-single">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="post-body-wrap">
                <SharePage data={router} />
                {blocks
                  ? blocks.map((block, index) => (
                      <Blocks block={block} key={index} />
                    ))
                  : null}
              </div>
            </Col>
            {recentBlogs && (
              <Col lg={4}>
                <RecentBlogs
                  recentBlogs={recentBlogs}
                  topTitle="Podcasts and Talks"
                />
              </Col>
            )}
          </Row>
        </Container>
      </section>
      {blocks &&
        blocks.map((block, index) => {
          const blockType = block.__typename;
          const attributesJSON = block.attributesJSON;
          return blockType === "AcfBabylonSuggestedArticlesBlock" ? (
            <SuggestedArticlesBlock
              attributes={attributesJSON}
              key={index}
              alllink={listingPage.uri}
            />
          ) : null;
        })}
      {/* <div dangerouslySetInnerHTML={{__html: sanitize( data?.page?.content ?? {} )}}/> */}
    </PostLayout>
  );
  // return ('page')
};

export default Podcasts;

export async function getStaticProps({ params }) {
  // console.warn('params', params);
  const { data, errors } = await client.query({
    query: GET_PODCAST_SINGLE,
    variables: {
      uri: "podcasts/" + params?.podcasts.join("/"),
    },
  });
  // console.warn('data', errors);

  const headerLayout = data?.headerLayout;
  const themeOptions = data?.themeOptions;
  const headerMenus = data?.headerMenus?.edges;
  const footerMenus = data?.footerMenus?.edges;
  const footerBottomMenus = data?.footerBottomMenus?.edges;
  const homeBlocks = data?.page?.blocks;
  const pageTitle = data?.page?.title;
  const pageTerms = data?.page?.terms?.nodes ? data?.page?.terms?.nodes : null;
  const pageId = data?.page?.id;
  const pageImage = data?.page?.featuredImage;
  const uri = data?.page?.uri;
  const seo = data?.page?.seo;
  const date = data?.page?.date;
  const author = data?.page?.author?.node;
  // const author = data?.page?.author?.node;

  // console.warn(homeBlocks);

  const defaultProps = {
    props: {
      data: {
        headerLayout: {
          headerLayout,
        },
        logos: {
          themeOptions,
        },
        pageInfo: {
          pageId,
        },
        terms: {
          pageTerms,
        },
        pImage: {
          pageImage,
        },
        pageTitle: {
          pageTitle,
          uri,
        },
        seo,
        postMeta: {
          date,
          author,
        },
        homeBlocks: {
          homeBlocks,
        },
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
    query: GET_PODCASTS_SLUGS,
  });
  // console.warn('data', data);
  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((page) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        // if ( ! isEmpty( page?.uri ) ) {
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { podcasts: slugs } });
        // console.warn('path--', page?.uri?.split("/"));
        // console.warn('path', slugs);
      }
    });
  // console.warn('path', pathsData);

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
