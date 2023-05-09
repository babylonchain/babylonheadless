import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_RECENT_NEWS = gql`
  query GET_NEWS($first: Int!, $notIn:[ID]!) {
    posts: allNews(
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