import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_NEWS_BY_CATEGORY = gql`
  query GET_NEWS_BY_CATEGORY(
    $filterCats: [String]
    $field: PostObjectsConnectionOrderbyEnum!
    $pageSize: Int!
    $pageOffset: Int!
  ) {
    posts: allNews(
      where: {
        taxQuery: {
          taxArray: {
            field: TAXONOMY_ID
            operator: IN
            taxonomy: NEWSCATEGORY
            terms: $filterCats
          }
        }
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
