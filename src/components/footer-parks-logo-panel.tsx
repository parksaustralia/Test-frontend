import React, { Component } from "react"
import SharedParksLogoBlock from "./blocks/sharedparkslogo"
const park = process.env.GATSBY_PARK;
class FooterSharedParksLogoPanel extends Component {
    render() {
      return (
        <div className="footer__park-logos-panel">
          <div className="grid-wrapper"> 
            <div className="grid-row clearfix"> 
              <SharedParksLogoBlock />
            </div>
          </div>
        </div>
      )
    }
  }
export default FooterSharedParksLogoPanel
