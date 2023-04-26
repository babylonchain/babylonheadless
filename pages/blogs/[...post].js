import client from "../../src/apollo/client";
import { isEmpty } from "lodash";
import { GET_POST_SLUGS } from "../../src/queries/posts/get-posts";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import { GET_POST } from "../../src/queries/posts/get-post";
import { useRouter } from "next/router";
import PostLayout from "../../src/components/layout/PostLayout";
import { Container, Row, Col } from "react-bootstrap";
import BackArrow from "../../src/components/Icons/backArrow";
import Link from "next/link";

import PostMeta from "../../src/components/blogs/post/PostMeta";
import SharePage from "../../src/components/SharePage";

const Post = ({ data }) => {
  const router = useRouter();
  const listingPage = data?.logos?.themeOptions?.themeSettings?.chooseBlogPage;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <PostLayout data={data}>
      <section className="section-page-title post">
        <Container>
          <div className="wrap">
            <Row>
              <Col lg={6}>
                <div className="page-title">                
                  <h2 className="h2">
                    {data.pageTitle.pageTitle}
                  </h2>
                  <PostMeta data={data?.postMeta} />
                </div>
              </Col>
              <Col lg={6}>
                <h1>Test</h1>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="section-post-header post">
        <Container>
          <Row>
            <Col xs={2}>
              <div className="arrow">
                <Link href={listingPage ? listingPage.uri : ""}>
                  <a>
                    <BackArrow />
                  </a>
                </Link>
              </div>
            </Col>
            <Col xs={10} md={8}>
              <div className="page-title">
                <h1 className="h2">{data.pageTitle.pageTitle}</h1>
                <PostMeta data={data?.postMeta} />
                <SharePage data={router} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <div dangerouslySetInnerHTML={{__html: sanitize( data?.page?.content ?? {} )}}/> */}
    </PostLayout>
  );
  // return ('page')
};

export default Post;

export async function getStaticProps({ params }) {
  // console.warn('params', params);
  const { data, errors } = await client.query({
    query: GET_POST,
    variables: {
      uri: "/blogs/" + params?.post.join("/"),
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
        pageTitle: {
          pageTitle,
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
    query: GET_POST_SLUGS,
  });
  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((page) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        // console.warn('data', page?.uri?);
        // if ( ! isEmpty( page?.uri ) ) {
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        // console.warn('data---', slugs);
        pathsData.push({ params: { post: slugs } });
        // console.warn('path', slugs);
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
