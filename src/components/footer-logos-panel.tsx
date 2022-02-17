import React, { Component } from "react"
import FooterLogosBlock from "./blocks/footerlogos"
const park = process.env.GATSBY_PARK;
class FooterLogosPanel extends Component {
    render() {
      return (
        <div className="footer__logos-panel">
          <div className="grid-wrapper">
            <div className="grid-row clearfix">
                 <FooterLogosBlock park={park}/>
            </div>
          </div>
        </div>
      )
    }
  }
export default FooterLogosPanel
