import client from "../../src/apollo/client";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import { GET_NEWS_SLUGS } from "../../src/queries/news/get-news";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import { GET_NEWS_SINGLE } from "../../src/queries/news/get-news-single";
import { useRouter } from "next/router";
import PostLayout from "../../src/components/layout/PostLayout";
import { Container, Row, Col } from "react-bootstrap";
import BackArrow from "../../src/components/Icons/backArrow";
import Link from "next/link";
import Blocks from "../../src/components/layout/blocks/index";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PostMeta from "../../src/components/blogs/post/PostMeta";
import SharePage from "../../src/components/SharePage";
import Image from "next/image";
import Figure from "react-bootstrap/Figure";
import { GET_RECENT_NEWS } from "../../src/queries/news/get-recentNews";
import RecentBlogs from "../../src/components/blogs/post/recentBlogs";
import SuggestedArticlesBlock from "../../src/components/layout/blocks/SuggestedArticlesBlock";

const News = ({ data }) => {
  const router = useRouter();
  const pageId = data?.pageInfo?.pageId;

  const listingPage =
    data?.logos?.themeOptions?.themeSettings?.chooseNewsListingPage;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const getRecentPostList = (postType) => {
    return GET_RECENT_NEWS;
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
              News
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{data.pageTitle.pageTitle}</Breadcrumb.Item>
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
                  <h1 className="h2 mb-0">{data.pageTitle.pageTitle}</h1>
                  <PostMeta data={data?.postMeta} />
                </div>
              </Col>
              <Col lg={6}>
                <div className="featured-image">
                  {fImage ? (
                    <Image src={fImage?.mediaItemUrl} width={300} height={200} alt={fImage.alt ? fImage.alt : fImage.title }/>
                  ) : (
                    <Figure.Image
                    width={160}
                    height={90}
                      alt="image"
                      src="data:image/svg+xml,%3Csvg width='354' height='240' viewBox='0 0 354 240' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='354' height='240' fill='%23373940'/%3E%3Cpath d='M126.045 105.909V135H122.523V105.909H126.045ZM132.654 135V113.182H135.893V116.591H136.177C136.631 115.426 137.365 114.522 138.379 113.878C139.392 113.224 140.609 112.898 142.029 112.898C143.469 112.898 144.666 113.224 145.623 113.878C146.589 114.522 147.342 115.426 147.881 116.591H148.109C148.667 115.464 149.505 114.569 150.623 113.906C151.74 113.234 153.08 112.898 154.643 112.898C156.594 112.898 158.189 113.509 159.43 114.73C160.67 115.942 161.29 117.831 161.29 120.398V135H157.938V120.398C157.938 118.788 157.498 117.637 156.617 116.946C155.737 116.255 154.7 115.909 153.506 115.909C151.972 115.909 150.784 116.373 149.941 117.301C149.098 118.22 148.677 119.384 148.677 120.795V135H145.268V120.057C145.268 118.816 144.865 117.817 144.06 117.06C143.255 116.293 142.219 115.909 140.95 115.909C140.078 115.909 139.264 116.141 138.506 116.605C137.758 117.069 137.152 117.713 136.688 118.537C136.234 119.351 136.006 120.294 136.006 121.364V135H132.654ZM173.84 135.511C172.458 135.511 171.203 135.251 170.076 134.73C168.949 134.2 168.054 133.438 167.391 132.443C166.728 131.439 166.397 130.227 166.397 128.807C166.397 127.557 166.643 126.544 167.136 125.767C167.628 124.981 168.286 124.366 169.11 123.92C169.934 123.475 170.843 123.144 171.837 122.926C172.841 122.699 173.85 122.519 174.863 122.386C176.189 122.216 177.263 122.088 178.087 122.003C178.921 121.908 179.527 121.752 179.906 121.534C180.294 121.316 180.488 120.937 180.488 120.398V120.284C180.488 118.883 180.104 117.794 179.337 117.017C178.58 116.241 177.429 115.852 175.886 115.852C174.285 115.852 173.031 116.203 172.121 116.903C171.212 117.604 170.573 118.352 170.204 119.148L167.022 118.011C167.59 116.686 168.348 115.653 169.295 114.915C170.251 114.167 171.293 113.646 172.42 113.352C173.556 113.049 174.674 112.898 175.772 112.898C176.473 112.898 177.278 112.983 178.187 113.153C179.105 113.314 179.991 113.651 180.843 114.162C181.705 114.673 182.42 115.445 182.988 116.477C183.556 117.509 183.84 118.892 183.84 120.625V135H180.488V132.045H180.317C180.09 132.519 179.711 133.026 179.181 133.565C178.651 134.105 177.945 134.564 177.065 134.943C176.184 135.322 175.109 135.511 173.84 135.511ZM174.352 132.5C175.677 132.5 176.795 132.24 177.704 131.719C178.622 131.198 179.314 130.526 179.778 129.702C180.251 128.878 180.488 128.011 180.488 127.102V124.034C180.346 124.205 180.033 124.361 179.55 124.503C179.077 124.635 178.528 124.754 177.903 124.858C177.287 124.953 176.686 125.038 176.099 125.114C175.521 125.18 175.052 125.237 174.692 125.284C173.821 125.398 173.007 125.582 172.249 125.838C171.501 126.084 170.895 126.458 170.431 126.96C169.977 127.453 169.749 128.125 169.749 128.977C169.749 130.142 170.18 131.023 171.042 131.619C171.913 132.206 173.016 132.5 174.352 132.5ZM198.766 143.636C197.146 143.636 195.754 143.428 194.589 143.011C193.425 142.604 192.454 142.064 191.678 141.392C190.911 140.729 190.3 140.019 189.845 139.261L192.516 137.386C192.819 137.784 193.202 138.239 193.666 138.75C194.13 139.271 194.765 139.721 195.57 140.099C196.384 140.488 197.449 140.682 198.766 140.682C200.527 140.682 201.981 140.256 203.126 139.403C204.272 138.551 204.845 137.216 204.845 135.398V130.966H204.561C204.315 131.364 203.964 131.856 203.51 132.443C203.065 133.021 202.421 133.537 201.578 133.991C200.745 134.437 199.618 134.659 198.197 134.659C196.436 134.659 194.855 134.242 193.453 133.409C192.061 132.576 190.958 131.364 190.143 129.773C189.339 128.182 188.936 126.25 188.936 123.977C188.936 121.742 189.329 119.796 190.115 118.139C190.901 116.473 191.995 115.185 193.396 114.276C194.798 113.357 196.417 112.898 198.254 112.898C199.675 112.898 200.802 113.134 201.635 113.608C202.478 114.072 203.122 114.602 203.567 115.199C204.021 115.786 204.372 116.269 204.618 116.648H204.959V113.182H208.197V135.625C208.197 137.5 207.771 139.025 206.919 140.199C206.076 141.383 204.94 142.249 203.51 142.798C202.089 143.357 200.508 143.636 198.766 143.636ZM198.652 131.648C199.997 131.648 201.133 131.34 202.061 130.724C202.989 130.109 203.695 129.223 204.178 128.068C204.661 126.913 204.902 125.53 204.902 123.92C204.902 122.348 204.665 120.961 204.192 119.759C203.718 118.556 203.018 117.614 202.089 116.932C201.161 116.25 200.016 115.909 198.652 115.909C197.232 115.909 196.048 116.269 195.101 116.989C194.163 117.708 193.458 118.674 192.984 119.886C192.52 121.098 192.288 122.443 192.288 123.92C192.288 125.436 192.525 126.776 192.999 127.94C193.482 129.096 194.192 130.005 195.129 130.668C196.076 131.321 197.25 131.648 198.652 131.648ZM223.482 135.455C221.379 135.455 219.566 134.991 218.041 134.062C216.526 133.125 215.357 131.818 214.533 130.142C213.718 128.456 213.311 126.496 213.311 124.261C213.311 122.027 213.718 120.057 214.533 118.352C215.357 116.638 216.502 115.303 217.97 114.347C219.447 113.381 221.171 112.898 223.141 112.898C224.277 112.898 225.399 113.087 226.507 113.466C227.615 113.845 228.624 114.46 229.533 115.312C230.442 116.155 231.166 117.273 231.706 118.665C232.246 120.057 232.516 121.771 232.516 123.807V125.227H215.697V122.33H229.107C229.107 121.098 228.86 120 228.368 119.034C227.885 118.068 227.194 117.306 226.294 116.747C225.404 116.188 224.353 115.909 223.141 115.909C221.805 115.909 220.65 116.241 219.675 116.903C218.709 117.557 217.965 118.409 217.445 119.46C216.924 120.511 216.663 121.638 216.663 122.841V124.773C216.663 126.42 216.947 127.817 217.516 128.963C218.093 130.099 218.893 130.966 219.916 131.562C220.939 132.15 222.127 132.443 223.482 132.443C224.362 132.443 225.158 132.32 225.868 132.074C226.588 131.818 227.208 131.439 227.729 130.938C228.25 130.426 228.652 129.792 228.936 129.034L232.175 129.943C231.834 131.042 231.261 132.008 230.456 132.841C229.651 133.665 228.657 134.309 227.473 134.773C226.289 135.227 224.959 135.455 223.482 135.455Z' fill='%23747474'/%3E%3C/svg%3E%0A"
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
                <RecentBlogs recentBlogs={recentBlogs} topTitle="News" />
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

export default News;

export async function getStaticProps({ params }) {
  // console.warn('params', params);
  const { data, errors } = await client.query({
    query: GET_NEWS_SINGLE,
    variables: {
      uri: "news/" + params?.news.join("/"),
    },
  });
  // console.warn('data', data);

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
    query: GET_NEWS_SLUGS,
  });
  // console.warn('data', data);
  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((page) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        // if ( ! isEmpty( page?.uri ) ) {
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { news: slugs } });
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
