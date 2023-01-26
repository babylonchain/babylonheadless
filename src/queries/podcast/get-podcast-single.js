import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import ImageFragment from "../fragments/image";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PODCAST_SINGLE = gql`
	query GET_PODCAST_SINGLE($uri: String) {
    ${HeaderFooter}
	headerLayout: podcastsBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: podcastsBy(uri: $uri) {
	    id
	    title
	    content
	    uri
	    slug
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

export const GET_PODCAST_SINGLE_BY_ID = gql`
	query GET_PODCAST_SINGLE($uri: String) {
    ${HeaderFooter}
	headerLayout: podcastsBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: podcastsBy(uri: $uri) {
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
