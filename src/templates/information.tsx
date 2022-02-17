import React from "react";
import { graphql } from "gatsby";
import { SiteWideMessage1Block } from "../components/blocks/sitesidemessage1"
import { SocialMediaLinksBlock } from "../components/blocks/socialmedialinks"
import MapEmbed from "../components/map/MapEmbed"
// import YoutubeEmbed from "../components/video/YoutubeEmbed"
export default function InformationTemplate({ data }) { 
  const soicialLinks = <SocialMediaLinksBlock node={data.blockContentSocialMedia} />
  const message1 = <SiteWideMessage1Block node={data.blockContentSiteWideMessage1} />
  let heroImageSection
  if(data.nodeInformation.relationships.field_hero_image != null) {
    const apiDomain = process.env.GATSBY_API_DOMAIN; 
    const image = apiDomain + data.nodeInformation.relationships.field_hero_image?.relationships?.field_media_image?.uri?.url;          
    heroImageSection = ( 
      <section className="pb-xlarge"> 
      <div className="hero-block__container" data-view-carousel="{&quot;width&quot;:&quot;1920&quot;,&quot;height&quot;:&quot;576&quot;}"> 
      <div className="hero-block__loading hero-block__loading--hidden" ></div> 
      <div className="hero-block__carousel"> <div className="hero-block__inner"> 
      <ul className="hero-block__slides"> 
        <li className="hero-block__slide"> 
          <div className="hero-block__slide-wrapper"> 
          <img className="hero-block__image" src={image} alt={data.nodeInformation.relationships?.field_hero_image.field_media_image?.alt} /> 
          <div className="hero-block__overlay-container"> 
            <div className="hero-block__credit" dangerouslySetInnerHTML={{ __html: data.nodeInformation.relationships?.field_hero_image?.field_caption?.processed}} />
          </div> </div> 
        </li> 
      </ul> </div> </div> 
      </div> </section> 
    )
  }
  const fieldInfoPulloutColumns = data.nodeInformation.relationships.field_info_pullout.relationships.field_info_pullout_columns || []
  const infoPulloutColumns = fieldInfoPulloutColumns.map(
    (infoPullOutColumn, index: Number) => {
      const fieldInfoPullOutSections = infoPullOutColumn.relationships.field_info_pullout_section || []
      const infoPullOutSections = fieldInfoPullOutSections.map(
        (infoPullOutSection, idx: Number) => {
          let featureListItems = []
          let infoPulloutText 
          let infoPulloutTextP
          let featureListItemsUl
          const fieldInfoPulloutText = infoPullOutSection.field_info_pullout_text || []
          for (let element in fieldInfoPulloutText) {
            if(fieldInfoPulloutText[element].value != null) {
              infoPulloutTextP = (<div className="info-pullout__text"><p>{fieldInfoPulloutText[element].value}</p></div>)
            }
          }
          const fieldInfoPullOutFeatureLists = infoPullOutSection.relationships.field_info_pullout_feature_list || []
          for( let item in fieldInfoPullOutFeatureLists ) {
            if(fieldInfoPullOutFeatureLists[item].field_feature_item_include !=null) {
              if(fieldInfoPullOutFeatureLists[item].field_feature_item_include === "feature_list_item_tick") {
                if(fieldInfoPullOutFeatureLists[item].field_name != null) {
                  featureListItems.push( 
                    <li className="info-pullout__feature-list-item info-pullout__feature-list-item--tick">
                      <span className="hide-text">Tick icon</span>
                      <em>
                        {fieldInfoPullOutFeatureLists[item].field_name}
                      </em>
                    </li>
                  )
                }
              } else if(fieldInfoPullOutFeatureLists[item].field_feature_item_include === "feature_list_item_cross") {
                if(fieldInfoPullOutFeatureLists[item].field_name != null) {
                  featureListItems.push( 
                    <li className="info-pullout__feature-list-item info-pullout__feature-list-item--cross">
                      <span className="hide-text">Cross icon</span>
                      <em>
                        {fieldInfoPullOutFeatureLists[item].field_name}
                      </em>
                    </li>
                  )
                }
              }
            }
          }
          if(featureListItems != null) {
            featureListItemsUl = (<ul className="info-pullout__feature-list"> {featureListItems}</ul>)
          }
          return(        
            <div className="info-pullout__heading"> 
              <h3>{infoPullOutSection.field_info_pullout_heading}</h3> 
              {infoPulloutTextP}
              {featureListItemsUl}
            </div> 
          ) 
          })
      return(
        <div className='info-pullout__column clearfix'>
          <div className="info-pullout__section"> 
            {infoPullOutSections}
          </div>
        </div>

      )
  })

  // const videoEmbedId = data.nodeInformation.relationships?.field_embed_video?.field_video_id;
  // const videoTitle = data.nodeInformation.relationships?.field_embed_video?.field_video_title?.value;  
  // let embedVideoSection
  // if(data.nodeInformation.relationships.field_embed_video != null) {
  //   embedVideoSection = <YoutubeEmbed embedId={videoEmbedId} videoTitle={videoTitle} />
  // } 
  const handleMapTabClick = () => {
    document.getElementsByClassName('info-pullout-wrapper')[0].classList.toggle('info-pullout-wrapper--map-mode')
  }
  let embedMap
  // embedMap = <MapEmbed title={{ __html: data.nodeInformation.field_information_title.value}} path={data.nodeInformation.path.alias} description={{ __html: data.nodeInformation.field_information_description.value }} latNum={data.nodeInformation.field_info_latitude_number} lonNum={data.nodeInformation.field_info_longitude_number}/>
   embedMap = <MapEmbed title={{ __html: data.nodeInformation.field_information_title.value}} latNum={data.nodeInformation.field_info_latitude_number} lonNum={data.nodeInformation.field_info_longitude_number}/>
 
  return (
    <>
    <div className="main-content" id="main-content" role="main"> 
      <section className="pt-large pb-small"> 
        <div className="grid-wrapper"> 
          <div className="grid-row clearfix"> 
            <div className="grid-col grid-col--12"> 
              <div className="page-header"> 
                <ul className="page-header__breadcrumbs clearfix"> 
                  <li className="page-header__breadcrumb"> 
                    <a href={data.nodeInformation.path.alias} 
                      dangerouslySetInnerHTML={{ __html:data.nodeInformation.field_information_title.value} } />              
                  </li> 
                </ul>             
                <div className="page-header__heading-wrapper clearfix">
                  <h1 className="page-header__heading" dangerouslySetInnerHTML={{ __html: data.nodeInformation.field_information_title.value }} />
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
      <section className="pb-medium"> 
        <div className="grid-wrapper"> 
          <div className="grid-row clearfix"> 
            <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0"> 
            <div className="copy">
              {message1}
              {data.nodeInformation.body?.value ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.nodeInformation.body.value }}
                  />
                ) : (
                  ""
                )}
              {/* {embedVideoSection}  */}
            </div>
          </div> 
        </div> 
        </div> 
      </section> 
      <section className='pb-xlarge'>
        <div className='info-pullout-wrapper' data-view-info-pullout=''>
          <div className='grid-wrapper'>
            <div className='grid-row clearfix'>
              <div className='grid-col grid-col--12 grid-col--no-gutter'>
                <div className='info-pullout'>
                  <button className='info-pullout__info-tab'>
                    <div className='info-pullout__info-tab-inner'>
                      <span aria-hidden='true'>
                        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M14 0c2.528 0 4.866.627 7.015 1.881a13.966 13.966 0 0 1 5.104 5.104C27.373 9.134 28 11.472 28 14c0 2.528-.627 4.866-1.881 7.015a13.966 13.966 0 0 1-5.104 5.104C18.866 27.373 16.528 28 14 28c-2.528 0-4.866-.627-7.015-1.881a13.966 13.966 0 0 1-5.104-5.104C.627 18.866 0 16.528 0 14c0-2.528.627-4.866 1.881-7.015a13.966 13.966 0 0 1 5.104-5.104C9.134.627 11.472 0 14 0zm0 8.662c.564 0 1.06-.209 1.488-.627.428-.418.642-.909.642-1.473 0-.564-.214-1.065-.642-1.502-.428-.438-.924-.656-1.488-.656s-1.06.219-1.488.656c-.428.438-.642.938-.642 1.502 0 .564.214 1.055.642 1.473.428.418.924.627 1.488.627zm-2.042 13.737h4.083a.909.909 0 0 0 .671-.262.91.91 0 0 0 .263-.671v-.933a.906.906 0 0 0-.263-.671.909.909 0 0 0-.671-.262l.029-7.467a.894.894 0 0 0-.277-.656.895.895 0 0 0-.656-.277h-3.179a.909.909 0 0 0-.671.262.91.91 0 0 0-.263.671v.933c0 .272.087.496.263.671.178.176.42.27.671.262v5.6a.909.909 0 0 0-.671.262.91.91 0 0 0-.263.671v.933c0 .272.087.496.263.671.178.176.42.27.671.262v.001z" /></g></svg>
                      </span>
                      <em>Information</em>
                    </div>
                  </button>
                  {infoPulloutColumns}
                  <div className="map-pullout">
                    <button className="map-pullout__map-tab" onClick={handleMapTabClick}>
                      <div className="map-pullout__map-tab-inner">
                        <span aria-hidden="true">
                          <svg width="21" height="29" viewBox="0 0 21 29" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M10.5.5c2.82 0 5.235 1.05 7.248 3.15 2.012 2.1 3.019 4.628 3.019 7.583 0 1.498-.302 3.087-.904 4.77-.603 1.681-1.332 3.183-2.188 4.505a56.813 56.813 0 0 1-2.567 3.66c-.855 1.119-1.584 1.98-2.187 2.582l-.904.904c-.642.564-1.172.841-1.59.831-.418-.01-.928-.286-1.531-.83a58.014 58.014 0 0 1-.934-.963c-.388-.409-1.084-1.235-2.085-2.48a35.13 35.13 0 0 1-2.64-3.733c-.758-1.244-1.448-2.722-2.07-4.433-.623-1.711-.934-3.315-.934-4.813 0-2.955 1.007-5.483 3.02-7.583C5.264 1.55 7.68.5 10.5.5zm0 15.108c1.342 0 2.489-.471 3.442-1.414.952-.943 1.429-2.086 1.429-3.427 0-1.342-.477-2.49-1.43-3.442-.952-.953-2.1-1.43-3.441-1.43-1.342 0-2.484.477-3.427 1.43-.943.953-1.415 2.1-1.415 3.442 0 1.341.472 2.484 1.415 3.427.943.943 2.085 1.414 3.427 1.414z"/></g></svg>
                        </span>
                        <em>Map</em>
                      </div>
                    </button><button className="map-pullout__map-tab--mobile">
                      <div className="map-pullout__map-tab-inner">
                        <span aria-hidden="true">
                          <svg width="21" height="29" viewBox="0 0 21 29" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M10.5.5c2.82 0 5.235 1.05 7.248 3.15 2.012 2.1 3.019 4.628 3.019 7.583 0 1.498-.302 3.087-.904 4.77-.603 1.681-1.332 3.183-2.188 4.505a56.813 56.813 0 0 1-2.567 3.66c-.855 1.119-1.584 1.98-2.187 2.582l-.904.904c-.642.564-1.172.841-1.59.831-.418-.01-.928-.286-1.531-.83a58.014 58.014 0 0 1-.934-.963c-.388-.409-1.084-1.235-2.085-2.48a35.13 35.13 0 0 1-2.64-3.733c-.758-1.244-1.448-2.722-2.07-4.433-.623-1.711-.934-3.315-.934-4.813 0-2.955 1.007-5.483 3.02-7.583C5.264 1.55 7.68.5 10.5.5zm0 15.108c1.342 0 2.489-.471 3.442-1.414.952-.943 1.429-2.086 1.429-3.427 0-1.342-.477-2.49-1.43-3.442-.952-.953-2.1-1.43-3.441-1.43-1.342 0-2.484.477-3.427 1.43-.943.953-1.415 2.1-1.415 3.442 0 1.341.472 2.484 1.415 3.427.943.943 2.085 1.414 3.427 1.414z"/></g></svg>
                        </span>
                        <em>Map</em>
                      </div>
                    </button>                    
                    {embedMap}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  
    </div>
        </>
  );

}
export const query = graphql`
  query($park: String!,$drupalId: String!) {
    nodeInformation(drupal_id: { eq: $drupalId }) {
      field_information_title {
        value
      }
      path {
        alias
      }
      field_information_description {
        value
      }
      body {
        value
      }
      field_info_latitude_number
      field_info_longitude_number
      relationships {
        field_hero_image {
          ... on media__hero_image {
            name
            width: field_width
            height: field_height
            field_media_image {
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
        field_info_pullout {
          ... on paragraph__info_pullout {
            relationships {
              field_info_pullout_columns {
                ...on paragraph__info_pullout_column {
                    relationships {
                      field_info_pullout_section {
                      ...on paragraph__info_pullout_section {
                        field_info_pullout_heading
                        field_info_pullout_text{
                          value
                        }
                        relationships {
                          field_info_pullout_feature_list {
                            field_name
                            field_current_open
                            field_feature_item_include
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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