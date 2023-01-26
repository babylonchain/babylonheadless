import { gql } from "@apollo/client";
import MenuFragment from "./fragments/menus";
import ImageFragment from "./fragments/image";

export const HeaderFooter = `
  themeOptions: themeOptions {
    themeSettings {
      starterKitHeaderLogoTwo {
        ...ImageFragment
      }
      starterKitHeaderLogoOne {
        ...ImageFragment
      }
      starterKitSocialNetworkSettings {
        starterKitSocialNetworkSettingsIcon {
          ...ImageFragment
        }
        starterKitSocialNetworkSettingsUrl
      }
      babylonFooterLogo {
        ...ImageFragment
      }
      starterKitCopyrightText
      bannerTitle
      chooseBlogPage {
        ... on Page {
          id
          title
          uri
        }
      }
      chooseNewsListingPage {
        ... on Page {
          id
          title
          uri
        }
      }
      choosePodcastListingPage {
        ... on Page {
          id
          title
          uri
        }
      }
      chooseCareerPage {
        ... on Page {
          id
          title
          uri
        }
      }
      chooseApplicationPage {
        ... on Page {
          id
          title
          uri
        }
      }
    }
  }
  headerMenus: menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
        childItems {
          edges {
            node {
              ...MenuFragment
            }
          }
        }
      }
    }
  }
  footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
        childItems {
          edges {
            node {
              ...MenuFragment
            }
          }
        }
      }
    }
  }
  footerBottomMenus: menuItems(where: {location: FOOTER_BOTTOM_MENU, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
        childItems {
          edges {
            node {
              ...MenuFragment
            }
          }
        }          
      }
    }
  }  
`;

export const GET_MENUS = gql`
  query NewQuery {
    ${HeaderFooter}
    headerLayout: pageBy(uri: "/") {
      headerLayout {
        chooseHeaderType
        fieldGroupName
      }
    }
  }
  ${MenuFragment}
  ${ImageFragment}
`;
