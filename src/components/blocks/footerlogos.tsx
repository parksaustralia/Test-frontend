import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

export default function FooterLogosBlock({park}) {
  const data = useStaticQuery(graphql`
    query {
      allBlockContentFooterLogosPanel {
        nodes {
          field_site_for_block {
            drupal_internal__target_id
          }
          body {
            value
          }
        }
      }
    }
  `)
  const result = data.allBlockContentFooterLogosPanel.nodes.map((item, index: Number) => {  
    if(item.field_site_for_block.drupal_internal__target_id === `${park}`) {
      return (
        <div className="grid-col grid-col--12" dangerouslySetInnerHTML={{ __html: item.body.value }} />
      )
    }
  })
  return(    
    <div className="footer__nav-wrapper clearfix">{result}</div>
  )   
}