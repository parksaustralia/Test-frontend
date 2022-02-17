import React from "react";
import { graphql } from "gatsby";
import MapEmbed from "../map/MapEmbed"

export const EmbedmapParagraph = ({ node }) => {
  let embedMap
  if(node.field_latitude_number != null && node.field_longitude_number != null) {
    embedMap = <MapEmbed title="Map" latNum={node.field_latitude_number} lonNum={node.field_longitude_number}/>
 
  } 

  return(
    <section className="pb-small">
      <div className="grid-wrapper">
        <div className="grid-row clearfix">
          <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0 intro-section copy">    
          {node.field_description_at_top?.value? (
                <div
                dangerouslySetInnerHTML={{ __html: node.field_description_at_top.value }}
                />
            ) : (
                ""
            )}
          
          <div className="responsive-embed responsive-embed--with-poster-image mt-xsmall mb-medium">
            <div className="container">
             {embedMap}
            </div>
          </div>          
          {node.field_description_at_bottom?.value? (
                <div
                dangerouslySetInnerHTML={{ __html: node.field_description_at_bottom.value }}
                />
            ) : (
                ""
            )}          
          </div>
        </div>
      </div>
    </section>    
  );
};
export const fragment = graphql`
  fragment ParagraphEmbedmap on paragraph__embed_map {
    field_description_at_top {
      value
    }
    field_latitude_number
    field_longitude_number
    field_description_at_bottom {
      value
    }
  }
`;

