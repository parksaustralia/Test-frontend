import React from "react";
import { graphql } from "gatsby";
import { SocialMediaLinksBlock } from "../components/blocks/socialmedialinks"
import { MailChimpOptInFormBlock } from "../components/blocks/mailchimpoptinform"
import YoutubeEmbed from "../components/video/YoutubeEmbed"
export default function ArticleTemplate({ data }) { 
  const soicialLinks = <SocialMediaLinksBlock node={data.blockContentSocialMedia} />
  const mailChimpOptInBottomForm = <MailChimpOptInFormBlock node ={data.bottomForm} />
  const mailChimpOptInSideBarForm = <MailChimpOptInFormBlock node ={data.sideBarForm} />
  let heroImageSection
  if(data.nodeArticle.relationships.field_hero_image != null) {
    const apiDomain = process.env.GATSBY_API_DOMAIN; 
    const image = apiDomain + data.nodeArticle.relationships.field_hero_image?.relationships?.field_media_image?.uri?.url;          
    heroImageSection = (
      <section className="pb-xlarge"> 
      <div className="hero-block__container" data-view-carousel="{&quot;width&quot;:&quot;1920&quot;,&quot;height&quot;:&quot;576&quot;}"> 
      <div className="hero-block__loading hero-block__loading--hidden" ></div> 
      <div className="hero-block__carousel"> <div className="hero-block__inner"> 
        <ul className="hero-block__slides"> 
          <li className="hero-block__slide"> 
            <div className="hero-block__slide-wrapper"> 
            <img className="hero-block__image" src={image} alt={data.nodeArticle.relationships?.field_hero_image?.image?.alt} /> 
            <div className="hero-block__overlay-container"> 
              <div className="hero-block__credit" dangerouslySetInnerHTML={{ __html: data.nodeArticle.relationships?.field_hero_image?.field_caption?.processed}} />
            </div> </div> 
          </li> 
        </ul> 
      </div> </div> 
      </div> </section> 
    )
  }
  let embedVideoSection
  if(data.nodeArticle.relationships.field_embed_video !=null && data.nodeArticle.relationships.field_embed_video.field_video_id != null) {
    const videoEmbedId = data.nodeArticle.relationships?.field_embed_video?.field_video_id;
    const videoTitle = data.nodeArticle.relationships?.field_embed_video?.field_video_title?.value;  
    embedVideoSection = <YoutubeEmbed embedId={videoEmbedId} videoTitle={videoTitle} />
  } 
  const videoAndMailSection = (data?.nodeArticle?.field_article_type === "About" )?(
    <section className="section--with-subscribe-block pb-medium">
    <div className="grid-wrapper"> 
      <div className="grid-row clearfix"> 
        <div className="grid-col grid-col--8 tb-grid-col--12 ph-grid-col--12">
          <div className="copy">
            {data.nodeArticle.body?.value ? (
                <div
                  dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.value }}
                />
              ) : (
                <></>
              )}
            {embedVideoSection} 
          </div>
        </div> 
        <div className="grid-col grid-col--3 grid-col--push-1 tb-grid-col--12 tb-grid-col--push-0 ph-grid-col--12 ph-grid-col--push-0">
        {mailChimpOptInSideBarForm}
        </div>
      </div>  
    </div> 
  </section>):(
    <section className="pb-medium">
      <div className="grid-wrapper"> 
        <div className="grid-row clearfix"> 
          <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0">
            <div className="copy">
            {data.nodeArticle.body?.value ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.value }}
                        />
                      ) : (
                        <></>
                      )}
              {embedVideoSection} 
            </div>
          </div> 
        </div>  
      </div> 
    </section> 
  )
  
  return (
    <>
    <div className="main-content" id="main-content" role="main"> 
      <section className="pt-large pb-small"> 
        <div className="grid-wrapper"> 
          <div className="grid-row clearfix"> 
            <div className="grid-col grid-col--12"> 
              <div className="page-header"> 
                <ul className="page-header__breadcrumbs clearfix"> 
                  <li className="page-header__breadcrumb"> <a href="/news/"> News </a> </li> 
                  <li className="page-header__breadcrumb"> 
                    <a href={data.nodeArticle.path.alias} 
                      dangerouslySetInnerHTML={{ __html:data.nodeArticle.field_article_title.value} } />              
                  </li> 
                </ul>             
                <div className="page-header__heading-wrapper clearfix">
                  <h1 className="page-header__heading" dangerouslySetInnerHTML={{ __html: data.nodeArticle.field_article_title.value }} />
                  <ul className="page-header__social-icons">
                    {soicialLinks}
                  </ul>
                </div>   
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 
      {heroImageSection}
      {videoAndMailSection}
      {mailChimpOptInBottomForm}
    </div>
        </>
  );
}
export const query = graphql`
  query($park: String!, $drupalId: String!) {
    nodeArticle(drupal_id: { eq: $drupalId }) {
      body {
        value
      }
      field_article_title{
        value
      }
      path {
        alias
        pid
        langcode
      }	 
      field_article_type     
      relationships {
        field_hero_image {
          ...on media__hero_image {
            name
            width: field_width
            height: field_height
            image:field_media_image {
              alt
            }
            field_gradient_overlay
            field_caption {
              processed
            }
            relationships {
              field_media_image {
                uri {
                  url
                }
              }
            }
          }
        }
        field_embed_video{
          ...on paragraph__embed_video{
            field_video_id
            field_video_title {
              value
              format
              processed
            }
          }
        }        
      }
      field_publication_date 
      body {
        value
      }
    } 
    blockContentSocialMedia{
      ...SocialMediaLinksBlockQuery
    }  
    sideBarForm: blockContentMailchimpOptInForm(
      field_site_for_block: {drupal_internal__target_id: {eq: $park}}
      field_form_type: {eq: "sidebar"}
    ) {
      ...MailChimpOptInFormBlockQuery
    }
    bottomForm: blockContentMailchimpOptInForm(
      field_site_for_block: {drupal_internal__target_id: {eq: $park}}
      field_form_type: {eq: "bottom"}
    ) {
      ...MailChimpOptInFormBlockQuery
    }
  }
`;