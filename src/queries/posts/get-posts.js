import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_POSTS = gql`
  query GET_POSTS($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after 
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
        hasNextPage
        endCursor
      }
    }
  }
  ${ImageFragment}
`;
/**
 * Get post slugs.
 *
 */
export const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts: posts(first: 6) {
      nodes {
        uri
        id
        slug
      }
    }
  }
`;
