import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { EVERY_BREAKPOINT } from 'gatsby-plugin-image/dist/src/image-utils';

// const park = process.env.GATSBY_PARK; 
// switch (park) {
//   case "amp": require ("../../css/marine-parks.scss"); break;
//   case "bnp": require ("../../css/booderee.scss"); break;
//   case "cinp": require ("../../css/christmas-island.scss"); break;
//   case "corp": require ("../../css/parks-australia.scss"); break;
//   case "knp": require ("../../css/kakadu.scss"); break;
//   case "ninp": require ("../../css/norfolk-island.scss"); break;
//   case "pknp": require ("../../css/kakadu.scss"); break;
//   case "uktnp": require ("../../css/uluru.scss"); break;
//   default: break;
// }

export default function SiteLogoBlock() {
  const park = process.env.GATSBY_PARK; 
  const apiDomain = process.env.GATSBY_API_DOMAIN
  const data = useStaticQuery(graphql`
    query {
      allBlockContentSiteLogoPanel {
        nodes {
          field_site_for_block {
            drupal_internal__target_id
          }
          field_site_logo_class
          body {
            value
          }
          relationships {
            field_site_logo {
              relationships {
                field_media_image_1 {
                  ...on file__file {
                    uri {url}
                  }
                }
              }
            }
          }          
        }
      }
    }
  `)
  const result = data.allBlockContentSiteLogoPanel.nodes.map((item, index: Number) => {  
    if(item.field_site_for_block.drupal_internal__target_id === `${park}`) {
      const bgImgSrc = item.relationships?.field_site_logo?.relationships?.field_media_image_1?.uri?.url?(apiDomain + item.relationships.field_site_logo.relationships.field_media_image_1.uri.url):("")
      const bgImgAlt = item.body?.value?(item.body.value):("")
      const siteLogoClass = item.field_site_logo_class?(item.field_site_logo_class):("")
      return (
        <a
          className="masthead__logo-anchor hide-text"
          key={index.toString()}
          href="/"
        >
          <img className={siteLogoClass} src={bgImgSrc} alt={bgImgAlt} />
         
        </a>
      )
    }
  })
  return(    
    <h1 className="masthead__logo">{result}</h1>
  )   
}