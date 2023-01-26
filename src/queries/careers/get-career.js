import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import ImageFragment from "../fragments/image";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_CAREER = gql`
	query GET_CAREER($uri: String) {
    ${HeaderFooter}
	headerLayout: careerPositionBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: careerPositionBy(uri: $uri) {
	    id
	    title
		excerpt
	    content
	    slug
	    uri    
        date
		seo {
			...SeoFragment
			}
        careerPositionDetails {
            positionDetailsEmploymentType
            positionDetailsLocation
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
	}
    ${MenuFragment}
    ${ImageFragment}
	${SeoFragment}
`;

export const GET_CAREER_BY_ID = gql`
	query GET_CAREER($uri: String) {
    ${HeaderFooter}
	headerLayout: careerPositionBy(uri: $uri) {
		headerLayout {
		  chooseHeaderType
		  fieldGroupName
		}
	  }
	  page: careerPositionBy(uri: $uri) {
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
