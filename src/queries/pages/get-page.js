import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import ImageFragment from "../fragments/image";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
    ${HeaderFooter}
	headerLayout: pageBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: pageBy(uri: $uri) {
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
	  categories: categories {
		nodes {
			databaseId
			count
			name
			link
			uri
			slug
		}
	  }
	  newsCategories: newsCategories {
		nodes {
		  databaseId
		  count
		  name
		  link
		  uri
		  slug
		}
	  }
	  podcastsCategories: podcastsCategories {
		nodes {
		  databaseId
		  count
		  name
		  link
		  uri
		  slug
		}
	  }				
	  careers: careerPositions(first: 3) {
		nodes {
		  title
		  featuredImage {
			node {
			  sourceUrl
			}
		  }
		}
	  }
	}
    ${MenuFragment}
    ${ImageFragment}
	${SeoFragment}
`;

export const GET_PAGE_BY_ID = gql`
	query GET_PAGE($uri: String) {
    ${HeaderFooter}
	headerLayout: pageBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: pageBy(uri: $uri) {
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
