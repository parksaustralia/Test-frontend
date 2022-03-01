import React, { useState } from "react";
import { graphql } from "gatsby"

export const TitleImageTilesParagraph = ({ node }) => {
  const apiDomain = process.env.GATSBY_API_DOMAIN;
 
  const tileImages = node.relationships.field_notab_image_tiles || []

  const tileImagesList = tileImages.map((imgDiv, idx: Number) => { 
    const image = apiDomain + imgDiv.relationships.field_media_image?.uri?.url;
    const imageTileTitle = imgDiv.field_tile_image_title?.value;
    const aClass = imgDiv.field_tile_image_class;
    const aLink = imgDiv.field_tile_link_url;
    return(
      <a key={idx.toString()} className={aClass} href={aLink}> 
        <div className="tile__shim"> 
          <div className="tile__image-wrapper"> 
            <img className="tile__image" src={image} /> 
          </div> 
        </div> 
        <div className="tile__title">{imageTileTitle} </div> 
      </a>
    )
  });
  const paragraphTitle = node.field_title_img_tiles_prg_title.value
  return(
    <section className="section--highlight-background pt-xlarge" data-view-change-display-view=""> 
      <div className="grid-wrapper"> 
        <div className="grid-row clearfix"> 
          <div className="grid-col grid-col--12"> 
            <div className="section__heading-wrapper pb-large"> 
              <h2 id="discover-kakadu" className="section__heading t-center pb-small"> 
                {paragraphTitle}
              </h2> 
            </div>
            <div className="content-carousel">
              {tileImagesList}
            </div>
          </div>
        </div> 
      </div>
    </section>
  );
};

export const fragment = graphql`
fragment ParagrapTitleimagetiles on paragraph__title_image_tiles {
  field_title_img_tiles_prg_title {
    value
  }
  relationships {
    field_notab_image_tiles {
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
}`;