import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_NEWS = gql`
  query GET_NEWS($pageSize: Int!, $pageOffset: Int!) {
    posts: allNews(
      where: { offsetPagination: { offset: $pageOffset, size: $pageSize } }
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          uri
          content
          featuredImage {
            node {
              ...ImageFragment
            }
          }
          terms {
            nodes {
              name
              slug
              databaseId
            }
          }
          date
          author {
            node {
              databaseId
              firstName
              lastName
            }
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
  ${ImageFragment}
`;
/**
 * Get post slugs.
 *
 */
export const GET_NEWS_SLUGS = gql`
  query GET_NEWS_SLUGS {
    posts: allNews(last: 6) {
      nodes {
        uri
        id
        slug
      }
    }
  }
`;
