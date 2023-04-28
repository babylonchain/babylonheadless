import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_FEATURED_POST = gql`
  query GET_FEATURED_POST(
    $pageSearch: String!
    $first: Int!
    $after: String
  ) {
    posts(
      where: {
        metaQuery: {
            metaArray: [
              {
                key: "is_featured",
                value: "1"
              }
            ]
        },
        search: $pageSearch 
      }
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
