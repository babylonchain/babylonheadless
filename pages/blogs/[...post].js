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
import Blocks from "../../src/components/layout/blocks/index";

const Post = ({ data }) => {
  const router = useRouter();
  const listingPage = data?.logos?.themeOptions?.themeSettings?.chooseBlogPage;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const blocks = data?.homeBlocks?.homeBlocks;

  // console.log(data);

  return (
    <PostLayout data={data} detailsPage={'post'}>
      <section className="section-page-title post-single">
        <Container>
          <div className="page-title-wrap">
            <Row>
              <Col lg={6}>
                <div className="page-title">
                  <div className="categories">
                    <span>Category</span>
                  </div>
                  <h1 className="h2 mb-0">
                    {data.pageTitle.pageTitle}
                  </h1>
                  <PostMeta data={data?.postMeta} />
                </div>
              </Col>
              <Col lg={6}>
                <div className="featured-image">
                  <img src="https://babyloncha1stg.wpengine.com/wp-content/uploads/2022/10/bakground-image@2x.png" alt=""></img>
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
                    <Blocks
                      block={block}
                      key={index}
                    />
                  ))
                  : null}
              </div>
            </Col>
            <Col lg={4}>
                <div className="recent-posts">
                  <span className="h4">Recent posts</span>
                  <div className="posts-wrap">
                    <div className="post">
                      <div className="post-img">
                        <img src="https://babyloncha1stg.wpengine.com/wp-content/uploads/2022/10/bakground-image@2x.png" alt=""></img>
                      </div>
                      <div className="post-desc">
                        <a className="title" href="#">Checkpointing Consumer Zones to Babylon via IBC</a>
                        <span class="date">09 November 2022</span>
                      </div>
                    </div>
                    <div className="post">
                      <div className="post-img">
                        <img src="https://babyloncha1stg.wpengine.com/wp-content/uploads/2022/10/bakground-image@2x.png" alt=""></img>
                      </div>
                      <div className="post-desc">
                        <a className="title" href="#">Checkpointing Consumer Zones to Babylon via IBC</a>
                        <span class="date">09 November 2022</span>
                      </div>
                    </div>
                    <div className="post">
                      <div className="post-img">
                        <img src="https://babyloncha1stg.wpengine.com/wp-content/uploads/2022/10/bakground-image@2x.png" alt=""></img>
                      </div>
                      <div className="post-desc">
                        <a className="title" href="#">Checkpointing Consumer Zones to Babylon via IBC</a>
                        <span class="date">09 November 2022</span>
                      </div>
                    </div>
                  </div>
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
