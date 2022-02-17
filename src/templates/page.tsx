import React from "react";
import { graphql } from "gatsby";
import Slider from "react-slick";
import { SiteWideMessage1Block } from "../components/blocks/sitesidemessage1"
import { SocialMediaLinksBlock } from "../components/blocks/socialmedialinks"
import { getParagraph } from "../components/paragraphs";


export default function PageTemplate({ data }) { 
  const apiDomain = process.env.GATSBY_API_DOMAIN; 
  const heroBlockTitle = data.nodePage.field_hero_block_title?.processed?(data.nodePage.field_hero_block_title.processed):("")
  const heroImages = data.nodePage.relationships.field_hero || []
  const soicialLinks = <SocialMediaLinksBlock node={data.blockContentSocialMedia} />
  const message1 = <SiteWideMessage1Block node={data.blockContentSiteWideMessage1} />
  const numberOfHeroImages = heroImages.length
  const images = heroImages.map(
    (heroImage, index: Number) => {  
      // const { gatsbyImageData: image } = heroImage.relationships.localFile?.childImageSharp?.gatsbyImageData;
      const image = apiDomain + heroImage.relationships.field_media_image.uri.url;
      const loadingType = index < 2 ? "eager" : "lazy";
      return (
        <div className="hero-block__slide-wrapper" key="hero-${index}">
          <img className="hero-block__image" src={image} alt={heroImage.field_media_image.alt} loading={loadingType}/>
          <div
            className={
              heroImage.field_gradient_overlay ? "hero-block__overlay-container" : ""
            }
          >
            <div 
              className="hero-block__title"
              dangerouslySetInnerHTML={{ __html:heroBlockTitle }}
            />
            <div
              className="hero-block__credit"
              dangerouslySetInnerHTML={{ __html: heroImage.field_caption.processed }}
            />
          </div>
        </div>
      );
    }
  );
  const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    pauseOnFocus: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 1000,
  }; 
  return (
    <>
    {data.nodePage.title != "Home" ? (
      <section className="pt-large pb-small"> 
        <div className="grid-wrapper"> 
          <div className="grid-row clearfix"> 
            <div className="grid-col grid-col--12"> 
              <div className="page-header"> 
                <div className="page-header__heading-wrapper clearfix">
                  <h1 className="page-header__heading" dangerouslySetInnerHTML={{ __html:data.nodePage.title }} />
                  <ul className="page-header__social-icons">
                    {soicialLinks}
                  </ul>
                </div>
              </div> 
            </div> 
          </div> 
        </div> 
      </section>
    ) : (
      ""
    )}
      <section className="pb-xlarge">
        <Slider {...sliderSettings}>{images}</Slider>
      </section>
      <section className="pb-medium"> 
        <div className="grid-wrapper"> 
          <div className="grid-row clearfix"> 
            <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0"> 
              <div className="copy"> 
                {message1}
                {data.nodePage.body?.value ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.nodePage.body.value }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {paragraphs}
    </>
  );
}
export const query = graphql`
  query($park: String!, $drupalId: String!) {
    nodePage(drupal_id: { eq: $drupalId }) {
      body {
        value
        summary
      }
      title
      field_hero_block_title{
        value
        format
        processed
      }    
      relationships {
        field_hero {
          ...MediaHeroImage
        }
        paragraphs: field_paragraphs {
          type: __typename
          ...ParagraphFigure
          ...ParagraphButtons
          ...ParagrapTabsimagetiles
          ...ParagraphTitlearticletypetiles
          ...ParagraphEmbedmap
        }
      }
    } 
    blockContentSiteWideMessage1(
      field_site_for_block: {drupal_internal__target_id: {eq: $park}}
    ) {
      ...SiteWideMessageBlockQuery  
    }
    blockContentSocialMedia{
      ...SocialMediaLinksBlockQuery
    }
  }
`;
