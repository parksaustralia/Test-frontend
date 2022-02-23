import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion"
import { graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"

export const AccordionsParagraph = ({ node }) => {
  // const apiDomain = process.env.GATSBY_API_DOMAIN;
  const accordionTitle = node.field_accordions_details
  const accordionPanels = node.relationships.field_accordion_panels || []

  const panelsItems = accordionPanels.map((panelDiv, index: Number) => {
    return(
      <Accordion.Item eventKey={index.toString()} key={index.toString()}>
        <Accordion.Header>
          <div dangerouslySetInnerHTML={{ __html: panelDiv.field_accordion_panel_title.value}} />
        </Accordion.Header>
        <Accordion.Body> 
          <div dangerouslySetInnerHTML={{ __html:panelDiv.field_accordion_panel_details.value}} />
        </Accordion.Body>
      </Accordion.Item>
    )
  });
 
  return(
  <section className="section--highlight-background pt-xlarge" data-view-change-display-view=""> 
    <div className="grid-wrapper"> 
      <div className="grid-row clearfix">
        <div className="grid-col grid-col--12"> 
          <Accordion>
            {panelsItems}
          </Accordion>
        </div>
      </div> 
    </div>
  </section>
  );
};

export const fragment = graphql`
fragment ParagrapAccoudions on paragraph__accordions_ {
  field_accordions_details {
    value
  }
  relationships {
    field_accordion_panels {
      field_accordion_panel_title {
        value
      }
      field_accordion_panel_details {
        value
      }
    }
  }
}`;