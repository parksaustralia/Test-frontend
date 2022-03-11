import React from "react";
import { graphql } from "gatsby";
import YoutubeEmbed from "../video/YoutubeEmbed"

export const EmbedVideoParagraph = ({ node }) => {
  let embedVideoSection
  if(node?.field_video_title?.value !=null && node?.field_video_id != null) {
    const videoEmbedId = node?.field_video_id;
    const videoTitle = node?.field_video_title?.value; 
    embedVideoSection = <YoutubeEmbed embedId={videoEmbedId} videoTitle={videoTitle} />
  }

  return(
    <section className="pb-medium">
      <div className="grid-wrapper"> 
        <div className="grid-row clearfix"> 
          <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0">
            <div className="copy">
              {embedVideoSection} 
            </div>
          </div> 
        </div>  
      </div> 
    </section> 
  );
};
export const fragment = graphql`
  fragment ParagraphEmbedvideo on paragraph__embed_video {
    field_video_id
    field_video_title {
      value
    }
  }
`;

