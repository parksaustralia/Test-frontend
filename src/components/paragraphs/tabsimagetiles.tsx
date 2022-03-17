import React, { useState } from "react";
import { useStaticQuery,graphql } from "gatsby"
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import MapEmbed from "../map/MapEmbed"
// import CategorisePagesList from "../categorisepagelist"

export const TabsImageTilesParagraph = ({ node }) => {
  const apiDomain = process.env.GATSBY_API_DOMAIN;
  const park = process.env.GATSBY_PARK;
  const tilesTabs = node.relationships.field_image_tiles_tabs || []
  let tabsItems: string[] = [];
  let tabPanelsArray : string[] = [];
  let tilesMap 
  let mapPanel
  if (node.field_include_tiles_map == true) {
    let embedMap
    embedMap = <MapEmbed title="Map" latNum={node.field_tile_latitude_number} lonNum={node.field_tile_longitude_number}/>
    const listDisplayClick = (e) => {
      e.preventDefault();
      document.getElementsByClassName('section__view-item--map')[0].classList.remove('section__view-item--active')
      document.getElementsByClassName('section__view-item--list')[0].classList.add('section__view-item--active')
      var els = document.getElementsByClassName('content-carousel__slide-map');
      for(let idx=0; idx < els.length; idx++){
        els[idx].classList.remove('content-carousel__slide-map--visible')
      }
      document.getElementsByClassName('content-carousel')[0].classList.remove('content-carousel--fixed-height')
    }
    const mapDisplayclick = (e) => {
      e.preventDefault();
      document.getElementsByClassName('section__view-item--list')[0].classList.remove('section__view-item--active')
      document.getElementsByClassName('section__view-item--map')[0].classList.add('section__view-item--active')
      var els = document.getElementsByClassName('content-carousel__slide-map');
      for(let idx=0; idx < els.length; idx++){
        els[idx].classList.add('content-carousel__slide-map--visible')
      }
      document.getElementsByClassName('content-carousel')[0].classList.add('content-carousel--fixed-height')
    }
    tilesMap = (
      <div className="section__view-wrapper flex-right">
      <ul className="section__view">
        <li className="section__view-item section__view-item--list section__view-item--active">
          <a className="hide-text" href="#" onClick={listDisplayClick}>List view</a>
        </li>
        <li className="section__view-item section__view-item--map">
          <a className="hide-text" href="#" onClick={mapDisplayclick}>Map view</a>
        </li>
      </ul>
    </div>
    )
    mapPanel =(
      <div className="content-carousel__slide-map">
        <div className="map-embed content-carousel__map">
          {embedMap}
        </div>
      </div>
    )
  }
  tilesTabs.map((tabDiv, index: Number) => {
    tabsItems.push(tabDiv.field_tile_tab_title?.value?(tabDiv?.field_tile_tab_title?.value):(""))
    let tabsPanelsItem = ``
    const tileCategory = tabDiv?.field_tile_category?(tabDiv?.field_tile_category):(null)
    if(tileCategory != null) {     
      const data = useStaticQuery(graphql`
      query {
        allNodeInformation {
          nodes {
            field_site{
              drupal_internal__target_id
            }
            field_information_category
            field_information_title {
              value
            }
            path {
              alias
            }
            relationships {
              field_tile_image {
                ... on media__tile_image {
                  relationships {
                    field_media_image {
                      uri {
                        url
                      }
                    }
                  }
                }
              }   
            }   
          }
        }
      }`)
      const categorisePageList = data?.allNodeInformation?.nodes?(data?.allNodeInformation?.nodes):([])
      // let list  
      let i = 0
      categorisePageList.forEach((item) => {
      // for (let i = 0, len = categorisePageList.length; i < len; i++) {
        //list = categorisePageList[i]
        if(item?.field_site?.drupal_internal__target_id === park && item?.field_information_category === tileCategory) {
          const imgSrc = item.relationships?.field_tile_image?.relationships?.field_media_image?.uri?.url?(apiDomain + item.relationships.field_tile_image.relationships.field_media_image.uri.url):""
          const link = item?.path?.alias?(item?.path?.alias.replace(`/${park}`, "")):("");
          const tileTitle = item?.field_information_title?.value?(item?.field_information_title?.value):("")
          const key = `alink`+i;
          tabsPanelsItem +=`
            <a key=${key} class="tile" href=${link}> 
              <div class="tile__shim"> 
                <div class="tile__image-wrapper"> 
                  <img class="tile__image" src=${imgSrc} /> 
                </div> 
              </div> 
              <div class="tile__title">${tileTitle} </div> 
            </a>
          `
          i++
        }
      } )    
    } else {
      const tileImages = tabDiv.relationships.field_tile_images_ || []
      tileImages.map((imgDiv, idx: Number) => { 
        const image = apiDomain + imgDiv.relationships.field_media_image?.uri?.url;
        const imageTileTitle = imgDiv.field_tile_image_title?.value;
        const aClass = imgDiv.field_tile_image_class;
        const aLink = imgDiv.field_tile_link_url;
        const vKey = `blink`+idx;
        tabsPanelsItem +=`
          <a key=${vKey} class=${aClass} href=${aLink}> 
            <div class="tile__shim"> 
              <div class="tile__image-wrapper"> 
                <img class="tile__image" src=${image} /> 
              </div> 
            </div> 
            <div class="tile__title">${imageTileTitle} </div> 
          </a>
        `
      }) 
    } 
    tabPanelsArray.push(tabsPanelsItem)
  });

  // const titleId = slugify(${node.field_tabs_tile_paragraph_title.value})
  const paragraphTitle = node?.field_tabs_tile_paragraph_title?.value?(node?.field_tabs_tile_paragraph_title?.value):("")
  const tabs = tabsItems!=null?( tabsItems.map((tabItem) => {
    return( 
    <Tab><a dangerouslySetInnerHTML={{ __html:tabItem}} /></Tab> 
    )
   })):("")
  const panels = tabPanelsArray.map((panelItem) => {
    return(    
      <div className='content-carousel__slide'>
        <div className='tile-wrapper clearfix'>
          <TabPanel>        
            <div dangerouslySetInnerHTML={{ __html:panelItem}} />
          </TabPanel>
        </div>    
        {mapPanel}
      </div>
    )
  }) 
  return(
  <section className="section--highlight-background pt-xlarge" data-view-change-display-view=""> 
    <div className="grid-wrapper"> 
      <div className="grid-row clearfix">
        <div className="grid-col grid-col--12"> 
          <Tabs>
            <div className="section__heading-wrapper pb-large"> 
              <h2 id="" className="section__heading t-center pb-small"><div dangerouslySetInnerHTML={{ __html: paragraphTitle}}/></h2>
              <div className="section__nav-wrapper t-center"> 
                <TabList> {tabs}</TabList>
              </div>
              {tilesMap}
            </div>
            <div className="content-carousel">
              <div className="content-carousel__slides">
                {panels}
              </div>
            </div>
          </Tabs>
        </div>
      </div> 
    </div>
  </section>
  );
};

export const fragment = graphql`
fragment ParagrapTabsimagetiles on paragraph__title_tab_image_tiles {
  field_include_tiles_map
  field_tile_latitude_number
  field_tile_longitude_number
  field_tabs_tile_paragraph_title {
    value
  }
  relationships {
   field_image_tiles_tabs {
    field_tile_category
    field_tile_tab_title {
      value
    }
    relationships {
      field_tile_images_ {
        field_width
        field_height
        field_tile_image_title {
          value
        }
        field_tile_image_class
        field_tile_link_url
        relationships {
          field_media_image {
            uri {
                url
              }
            }
          }
       }
      }
   }
  }
}`;