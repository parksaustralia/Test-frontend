import React from 'react'
import { StaticQuery, graphql } from "gatsby"

const generateFooterNavItems = (data) => {
  const apiDomain = process.env.GATSBY_API_DOMAIN; 
  const socialLinksArr = data.blockContentFooterNavList.relationships.field_footer_social_links
  const footerNaveListArr = data.blockContentFooterNavList.relationships.field_footer_nav_items
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
  return (
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

const FooterNavListBlock = () => (

  <StaticQuery<GatsbyTypes.NavlistQueryQuery>
     query={
       graphql`
        query NavlistQuery {
          blockContentFooterNavList {
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
      `
      }
      render={data => (     
        <>      
         {generateFooterNavItems(data)} 
        </>
      )}
   />
)

export default FooterNavListBlock