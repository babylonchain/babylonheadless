import ParagraphBlock from "./PragraphBlock";
import HeadingBlock from "./HeadingBlock";
import QuoteBlock from "./QuoteBlock";
import HtmlBlock from "./HtmlBlock";
import VideoBlock from "./VideoBlock";
import TableBlock from "./TableBlock";
import SpacerBlock from "./SpacerBlock";
import BannerBlock from "./BannerBlock";
import ListBlock from "./ListBlock";
import HalfContentHalfImageBlock from "./HalfContentHalfImageBlock";
import MultipleColumnTextIconBlock from "./MultipleColumnTextIconBlock";
import VideoPopUpBannerBlock from "./VideoPopUpBannerBlock";
import InvestorLogoCarouselBlock from "./InvestorLogoCarouselBlock";
import MeetTheTeamBlock from "./MeetTheTeamBlock";
import BlogListingBlock from "./BlogListingBlock";
import BlogPostListingBlock from "./BlogPostListingBlock";
import FeaturedTop from "./FeaturedTop";
import ImageBlock from "./ImageBlock";
import CareerListingBlock from "./CareerListingBlock";
import CustomListBlock from "./CustomListBlock";
import ApplyFormBlock from "./ApplyFormBlock";
import ContactFormBlock from "./ContactFormBlock";

const Blocks = ({ block, categories, newsCategories, podcastsCategories }) => {
  // console.log("blocks", block);
  const blockType = block.__typename;
  const attributesJSON = block.attributesJSON;
  switch (blockType) {
    case "AcfBabylonBannerBlock":
      return <BannerBlock attributes={attributesJSON} />;

    case "AcfBabylonHalfContentHalfImageBlock":
      return <HalfContentHalfImageBlock attributes={attributesJSON} />;

    case "AcfBabylonMultipleColumnTextIconBlock":
      return <MultipleColumnTextIconBlock attributes={attributesJSON} />;

    case "AcfBabylonVideoPopUpBannerBlock":
      return <VideoPopUpBannerBlock attributes={attributesJSON} />;

    case "AcfBabylonMeetTheTeamBlock":
      return <MeetTheTeamBlock attributes={attributesJSON} />;

    case "AcfBabylonInvestorLogoCarouselBlock":
      return <InvestorLogoCarouselBlock attributes={attributesJSON} />;

    case "AcfBabylonBlogListingBlock":

    const attributesData = JSON.parse(attributesJSON);
    const postType = attributesData?.data?.choose_post_type;

      return (
        
        // (postType && postType==="posts") ? 
        <BlogPostListingBlock
          attributes={attributesJSON}
          categories={categories}
          newsCategories={newsCategories}
          podcastsCategories={podcastsCategories}
        />
        // :
        // <BlogListingBlock
        //   attributes={attributesJSON}
        //   categories={categories}
        //   newsCategories={newsCategories}
        //   podcastsCategories={podcastsCategories}
        // />
      );

    case "AcfBabylonFeaturedTopBlock":
        return (
          <FeaturedTop
            attributes={attributesJSON}
          />
    );

    case "AcfBabylonCareerPositionListingBlock":
      return <CareerListingBlock attributes={attributesJSON} />;

    case "AcfBabylonListBlock":
      return <CustomListBlock attributes={attributesJSON} />;

    case "AcfBabylonApplyFormBlock":
      return <ApplyFormBlock attributes={attributesJSON} />;

    case "AcfBabylonFormWithSidebarBlock":
      return <ContactFormBlock attributes={attributesJSON} />;

    case "CoreParagraphBlock":
      return <ParagraphBlock attributes={attributesJSON} />;

    case "CoreHeadingBlock":
      return <HeadingBlock attributes={block?.saveContent} />;

    case "CoreQuoteBlock":
      return <QuoteBlock attributes={block?.saveContent} />;

    case "CoreHtmlBlock":
      return <HtmlBlock attributes={block?.saveContent} />;

    case "CoreVideoBlock":
      return <VideoBlock attributes={block?.saveContent} />;

    case "CoreTableBlock":
      return <TableBlock attributes={block?.saveContent} />;

    case "CoreListBlock":
      return <ListBlock attributes={block?.saveContent} />;

    case "CoreSpacerBlock":
      return <SpacerBlock attributes={block?.saveContent} />;

    case "CoreImageBlock":
      return (
        <ImageBlock
          attributes={attributesJSON}
          dynamicContent={block?.dynamicContent}
        />
      );

    default:
      return null;
  }
};

export default Blocks;
