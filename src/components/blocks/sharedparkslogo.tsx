import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

export default function SharedParksLogoBlock() {
  const data = useStaticQuery(
    graphql`
      query{
        blockContentSharedFooterParksLogoPanel {
          body {
            value
          }
        }
      }
    `
  )
  return(   
    data?.blockContentSharedFooterParksLogoPanel?.body?.value?(
      <div className="grid-col grid-col--12" dangerouslySetInnerHTML={{ __html: data.blockContentSharedFooterParksLogoPanel.body.value }} />
    ):(
      <></>
    ) 
    
  )  
}



