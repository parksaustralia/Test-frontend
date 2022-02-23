// @ts-nocheck
import React, { Component } from "react"
import SideMainMenu from  "./plugin/gatsby-plugin-drupal-menus-custom/side/index"
// import SideBelowMenu from "./blocks/sidenavelist"

// const park = process.env.GATSBY_PARK; 

class SideNavigationPanel extends Component {
  render() {
    return (
      <>
        <SideMainMenu />
      </>
    )
  }
}
export default SideNavigationPanel


