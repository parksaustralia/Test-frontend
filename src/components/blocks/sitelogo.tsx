import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
const park = process.env.GATSBY_PARK
if(park === "amp") {
  require ("../../css/marine-parks.scss");
} else if(park =="bnp") {
  require ("../../css/booderee.scss");
} else if(park =="cinp") {
  require ("../../css/christmas-island.scss");
} else if(park =="corp") {
  require ("../../css/parks-australia.scss");
} else if(park =="knp") {
  require ("../../css/kakadu.scss");
} else if(park =="ninp") {
  require ("../../css/norfolk-island.scss");
} else if(park =="pknp") {
  require ("../../css/kakadu.scss");
} else if(park =="uktnp") {
  require ("../../css/uluru.scss");
}
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