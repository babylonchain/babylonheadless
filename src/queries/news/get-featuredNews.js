import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_FEATURED_NEWS = gql`
  query GET_FEATURED_NEWS(
    $field: PostObjectsConnectionOrderbyEnum!
    $pageSize: Int!
    $pageOffset: Int!
  ) {
    posts: allNews(
      where: {
        orderby: { field: $field, order: DESC, metaKeyField: "is_featured" }
        offsetPagination: { offset: $pageOffset, size: $pageSize }
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
      }
    }
  }
  ${ImageFragment}
`;
