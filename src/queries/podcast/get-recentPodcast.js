import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_RECENT_PODCASTS = gql`
  query GET_PODCASTS($first: Int!, $notIn:[ID]!) {
    posts: allPodcasts(
      first: $first
      where: {
        notIn: $notIn  
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