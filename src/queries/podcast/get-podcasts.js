import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_PODCASTS = gql`
  query GET_PODCASTS($first: Int!, $after: String, $pageSearch: String) {
    posts: allPodcasts(
      first: $first
      after: $after
      where: {
        search: $pageSearch  
      }
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
