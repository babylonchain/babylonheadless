import { gql } from "@apollo/client";
import ImageFragment from "../fragments/image";
export const GET_PODCAST_BY_CATEGORY = gql`
  query GET_PODCAST_BY_CATEGORY(
    $filterCats: [String]
    $field: PostObjectsConnectionOrderbyEnum!
    $first: Int!, 
    $after: String
    $pageSearch: String!
  ) {
    posts: allPodcasts(
      where: {
        taxQuery: {
          taxArray: {
            field: TAXONOMY_ID
            operator: IN
            taxonomy: PODCASTSCATEGORY
            terms: $filterCats
          }
        }
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
