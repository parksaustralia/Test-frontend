import React from "react";
import { graphql } from "gatsby";
import { SiteWideMessage1Block } from "../components/blocks/sitesidemessage1"
import { SocialMediaLinksBlock } from "../components/blocks/socialmedialinks"
import SideNavigationPanel from "../components/side-navigation-panel"
import { getParagraph } from "../components/paragraphs";


export default function PostTemplate({ data }) { 
  const paragraphs = data.nodePost.relationships.paragraphs.map(getParagraph);
  const soicialLinks = <SocialMediaLinksBlock node={data.blockContentSocialMedia} />
  const message1 = <SiteWideMessage1Block node={data.blockContentSiteWideMessage1} />  
  return (
    <main role="main">
    <div className="wrapper">
      <aside className="layout-sidebar-first" role="complementary">
        <div className="region region-sidebar-first">
          <SideNavigationPanel />
        </div>
      </aside>
      <div className="layout-content sidebar-left">
        <div className="region region-content">
          <div id="block-page-title-block" className="block block-core block-page-title-block">
            <h1 className="page-title"><span className="field field--name-title field--type-string field--label-hidden">Media centre | Parks Australia</span>
            </h1>
          </div>

          {data.nodePost.body?.value ? (
            <div className="main-content-block"
              dangerouslySetInnerHTML={{ __html: data.nodePost.body.value }}
            />
            ) : (
              <></>
            )}
          {paragraphs}                
        </div>
      </div>
      <aside className="layout-sidebar-second" role="complementary">
      </aside>
    </div>
    </main>
  );
}
export const query = graphql`
  query($park: String!, $drupalId: String!) {
    nodePost(drupal_id: { eq: $drupalId }) {
      body {
        value
      }
      title
      relationships {
        paragraphs: field_paragraphs {
          type: __typename
          ...ParagrapAccoudions
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
