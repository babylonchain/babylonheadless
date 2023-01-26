import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import ImageFragment from "../fragments/image";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_POST = gql`
	query GET_POST($uri: String) {
    ${HeaderFooter}
	headerLayout: postBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: postBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
		seo {
			...SeoFragment
			}
        author {
            node {
              firstName
              lastName
            }
          }
        date
		blocks {
			attributesJSON
			... on CoreImageBlock {
				dynamicContent
			  }
			  ... on CoreHeadingBlock {
				saveContent
			  }
			  ... on CoreQuoteBlock {
				saveContent
			  }
			  ... on CoreHtmlBlock {
				saveContent
			  }
			  ... on CoreVideoBlock {
				saveContent
			  }
			  ... on CoreTableBlock {
				saveContent
			  }
			  ... on CoreSpacerBlock {
				saveContent
			  }
			  ... on CoreListBlock {
				saveContent
			  }
		}
	  }
	}
    ${MenuFragment}
    ${ImageFragment}
	${SeoFragment}
`;

export const GET_POST_BY_ID = gql`
	query GET_POST($uri: String) {
    ${HeaderFooter}
	headerLayout: postBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: postBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
		blocks {
			attributesJSON
		}
	  }
	}
    ${MenuFragment}
    ${ImageFragment}
`;
