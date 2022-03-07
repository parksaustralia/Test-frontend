import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

export default function FooterNavListBlock({park}){
  const data = useStaticQuery(graphql`
    query {
      allBlockContentFooterNavList{
        nodes {        
          field_site_for_block {
            drupal_internal__target_id
          }     
          relationships {         
            field_footer_social_links {
              field_social_media_link_url {
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
            field_footer_nav_items {
              field_social_media_link_url {
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
      } 
    }
  `)

  const result = data.allBlockContentFooterNavList.nodes.map((item, index: Number) => {
    if(item?.field_site_for_block?.drupal_internal__target_id === `${park}`) {
      const apiDomain = process.env.GATSBY_API_DOMAIN; 
      // const park = process.env.GATSBY_PARK;
      const socialLinksArr = item?.relationships?.field_footer_social_links?(item.relationships.field_footer_social_links):([])
      const footerNaveListArr = item?.relationships?.field_footer_nav_items?(item.relationships.field_footer_nav_items):([])
      const socialLinks = socialLinksArr.map((socialLink, index: Number) => {        
        return(
          <li className="footer__social-link" key={index.toString()}>
            <a className="share-icon share-icon--greyscale hide-text" 
              href={socialLink.field_social_media_link_url.uri}>
              <img src={`${apiDomain}${socialLink.relationships.field_social_media_svg_icon.relationships.field_media_image_1.uri.url}`} />
            </a>
          </li>
        )
      })
      const footerNaveList = footerNaveListArr.map((navItem, index: Number) => {
        return(
          <li className="footer__nav-list-item" key={index.toString()}>
            <a className="mt-medium"
              href={navItem.field_social_media_link_url.uri}>
              <img src={`${apiDomain}${navItem.relationships.field_social_media_svg_icon.relationships.field_media_image_1.uri.url}`} />
            </a>
          </li>
          )
      })
      return(
        <ul className="footer__nav-list">
        <li className="footer__nav-list-item">
          <ul className="footer__social-links">
            {socialLinks}
          </ul>
        </li>
        {footerNaveList}
      </ul>
      )
    } 
  })  
  return (
    <>{result}</>
  )
}