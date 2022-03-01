import React, { Component, Fragment } from "react"
import PageHeader from "../components/page-header"
import FooterLogosPanel from "./footer-logos-panel"
import FooterNavigationPanel from "./footer-navigation-panel"
import FooterSharedParksLogoPanel from "./footer-parks-logo-panel"


export default function Layout({ children }) {
  return (
    <div>
      <Fragment>
        <div className="masthead">
          <div className="masthead__inner clearfix">
            <PageHeader />
          </div>
          </div>
        <div className="main-content" id="main-content" role="main">
          {children}
        </div>
        <div className="footer" role="contentinfo">
          <FooterLogosPanel />
          <FooterNavigationPanel />
          <FooterSharedParksLogoPanel/>
        </div>
      </Fragment>   
  </div>

  );
}

