import { gql } from "@apollo/client";
export const GET_CAREERS = gql`
  query GET_CAREERS($pageSize: Int!, $pageOffset: Int!) {
    careerPositions(
      where: { offsetPagination: { offset: $pageOffset, size: $pageSize } }
    ) {
      edges {
        node {
          id
          title
          slug
          date
          uri
          careerPositionDetails {
            positionDetailsEmploymentType
            positionDetailsLocation
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
`;
/**
 * Get post slugs.
 *
 */
export const GET_CAREERS_SLUGS = gql`
  query GET_CAREERS_SLUGS {
    posts: careerPositions(last: 1) {
      nodes {
        uri
        id
        slug
      }
    }
  }
`;
