import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_FEATURED_POST = gql`
  query GET_FEATURED_POST(
    $field: PostObjectsConnectionOrderbyEnum!
    $pageSearch: String!
    $first: Int!
    $after: String
  ) {
    posts(
      where: {
        orderby: { field: $field, order: DESC, metaKeyField: "is_featured" }
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
