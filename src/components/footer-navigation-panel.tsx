// @ts-nocheck
import React, { Component } from "react"
import FooterMenu from  "./plugin/gatsby-plugin-drupal-menus-custom/footer/index"
import FooterNavListBlock from "./blocks/footernavelist"

const park = process.env.GATSBY_PARK; 

class FooterNavigationPanel extends Component {
    render() {
      return (
        <div className="footer__navigation-panel">
          <div className="grid-wrapper">
            <div className="grid-row clearfix">
              <div className="grid-col grid-col--12">
                <div className="footer__nav-wrapper clearfix">   
                  <FooterMenu />
                  <FooterNavListBlock park={park}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
export default FooterNavigationPanel


