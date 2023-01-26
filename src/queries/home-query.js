import { gql } from "@apollo/client";
import MenuFragment from "./fragments/menus";
import ImageFragment from "./fragments/image";
import { HeaderFooter } from "./get-menus";
import SeoFragment from "./fragments/seo";

export const HOME_QUERY = gql`
query NewQuery {
  ${HeaderFooter}
	headerLayout: pageBy(uri: "/") {
    headerLayout {
      chooseHeaderType
      fieldGroupName
    }
  }
  page(id: "/", idType: URI) {
    id
    title
    content
    slug
    uri
    seo {
      ...SeoFragment
      }
    blocks {
      attributesJSON
    }
  }
}
${MenuFragment}
${ImageFragment}
${SeoFragment}
`;
