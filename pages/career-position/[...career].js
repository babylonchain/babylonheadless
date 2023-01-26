import client from "../../src/apollo/client";
import { isEmpty } from "lodash";
import { GET_CAREERS_SLUGS } from "../../src/queries/careers/get-careers";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import { GET_CAREER } from "../../src/queries/careers/get-career";
import { useRouter } from "next/router";
import PostLayout from "../../src/components/layout/PostLayout";
import { Container, Row, Col } from "react-bootstrap";
import BackArrow from "../../src/components/Icons/backArrow";
import Link from "next/link";

import CareerMeta from "../../src/components/career/post/CareerMeta";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Post = ({ data }) => {
  const router = useRouter();
  // console.warn(data);

  const listingPage =
    data?.logos?.themeOptions?.themeSettings?.chooseCareerPage;
  const applyPage =
    data?.logos?.themeOptions?.themeSettings?.chooseApplicationPage;
  const meta = data?.postMeta?.positionDetails;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <PostLayout data={data} detailsPage="career" className="test">
      <section className="section-page-title">
        <Container>
          <div className="page-title">
            <h2 className="h2">
              {listingPage ? listingPage.title : "careers"}
            </h2>
          </div>
        </Container>
      </section>
      <section className="section-post-header career-sidebar">
        <Container>
          <Row>
            <Col xs={12} md={1}>
              <div className="arrow">
                <Link href={listingPage ? listingPage.uri : ""}>
                  <a>
                    <BackArrow />
                  </a>
                </Link>
              </div>
            </Col>
            <Col xs={12} md={10}>
              <div className="react-breadcrum">
                <Breadcrumb>
                  <Breadcrumb.Item href={listingPage ? listingPage.uri : ""}>
                    {listingPage ? listingPage.title : "career"}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    {data.pageTitle.pageTitle}
                  </Breadcrumb.Item>
                  {meta ? (
                    <>
                      {meta?.positionDetailsLocation ? (
                        <Breadcrumb.Item active className="meta-item">
                          {meta?.positionDetailsLocation}
                        </Breadcrumb.Item>
                      ) : (
                        ""
                      )}
                      {meta?.positionDetailsEmploymentType ? (
                        <Breadcrumb.Item active className="meta-item">
                          {meta?.positionDetailsEmploymentType}
                        </Breadcrumb.Item>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Breadcrumb>
              </div>
              <div className="page-title">
                <h1 className="h2">{data.pageTitle.pageTitle}</h1>
                <CareerMeta data={data?.postMeta} />
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
    query: GET_CAREER,
    variables: {
      uri: "career-position/" + params?.career.join("/"),
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
  const excerpt = data?.page?.excerpt;
  const date = data?.page?.date;
  const positionDetails = data?.page?.careerPositionDetails;

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
          excerpt,
          uri,
        },
        seo,
        postMeta: {
          date,
          positionDetails,
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
    query: GET_CAREERS_SLUGS,
  });
  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((page) => {
      // console.warn('data', page);
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        // if ( ! isEmpty( page?.uri ) ) {
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { career: slugs } });
        // console.warn('path', slugs);
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
