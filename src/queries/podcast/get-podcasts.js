import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_PODCASTS = gql`
  query GET_PODCASTS($pageSize: Int!, $pageOffset: Int!) {
    posts: allPodcasts(
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
export const GET_PODCASTS_SLUGS = gql`
  query GET_PODCASTS_SLUGS {
    posts: allPodcasts(last: 6) {
      nodes {
        uri
        id
        slug
      }
    }
  }
`;
