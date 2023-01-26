import { gql } from "@apollo/client";
import ImageFragment from "./fragments/image";

export const GET_IMAGE = gql`
  query NewQuery {
    mediaItemBy(mediaItemId: 1339) {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`;
