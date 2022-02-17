import React from 'react'
import { graphql } from 'gatsby'

const park = process.env.GATSBY_PARK;

export const SiteWideMessage1Block = ({ node }) => {
  return(            
      node?.body?.value? (
        <div className="alert-box" dangerouslySetInnerHTML={{ __html: node.body.value }} />
      ) : (
         <div />
      )
  ) 
};

export const fragment  = graphql`
  fragment SiteWideMessageBlockQuery on block_content__site_wide_message_1 {
    body {value}
  }
`;