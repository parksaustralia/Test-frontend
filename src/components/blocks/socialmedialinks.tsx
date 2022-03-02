import React from 'react'
import { graphql } from 'gatsby'

const park = process.env.GATSBY_PARK;

export const SocialMediaLinksBlock = ({ node }) => {
  const apiDomain = process.env.GATSBY_API_DOMAIN
  const links = node?.relationships?.field_social_media_link?(node.relationships.field_social_media_link):([])
  if( links != null) {
    const linksLis = links.map ((link, index: Number) => {
      const imgSrc = link?.relationships?.field_social_media_svg_icon?.relationships?.field_media_image_1?.uri?.url?(apiDomain + link.relationships.field_social_media_svg_icon.relationships.field_media_image_1.uri.url):("")  
      const aSrc = link?.field_social_media_link_url?.uri?(link.field_social_media_link_url.uri):("")   
      return(
      <li className="page-header__social-icon" key={index.toString()}> 
        <a className="share-icon hide-text" href={aSrc} target="_blank"> 
        <img src={imgSrc} ></img>
        </a> 
      </li>
      )
    })
    return(            
        linksLis? ( 
          linksLis
        ) : (
          <></>
        )
    ) 
  } else {
    return(<></>)
  }
};

export const fragment  = graphql`
  fragment SocialMediaLinksBlockQuery on block_content__social_media {
    relationships {
      field_social_media_link {
        field_social_media_link_title
        field_social_media_link_url {
          title
          uri
        }
        relationships {
          field_social_media_svg_icon {
            relationships {
              field_media_image_1 {
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
`;