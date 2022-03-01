import React, { Component, Fragment } from "react"
import MainMenu from  "./plugin/gatsby-plugin-drupal-menus-custom/main/index"
import SiteLogoBlock from "./blocks/sitelogo"
class PageHeader extends Component {
  render() {
    return (
      <>
      <SiteLogoBlock />
      <nav
        className="navigation clearfix"
        data-view-navigation-mobile=""
        id="main-navigation"
        role="navigation"
      >
      <div className="navigation-mobile-wrapper">
        <ul className="navigation-dropdown--mobile-toggle clearfix">
          <li className="navigation-dropdown__item">
            <span className="navigation-dropdown__anchor">
              <span>Menu</span>
            </span>
          </li>
        </ul>
        <MainMenu />
      </div>
      </nav>

      <div className="masthead__push-right clearfix">
        <div className="masthead__search" data-view-masthead-search="">
          <button className="masthead__search-mobile-toggle">
            <span>
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0C6.52 0 4.398.88 2.64 2.64.88 4.397 0 6.52 0 9c0 2.48.88 4.602 2.64 6.36C4.397 17.12 6.52 18 9 18c1.76 0 3.36-.463 4.806-1.39l6.777 6.807c.39.39.86.583 1.417.583.556 0 1.028-.194 1.417-.583.39-.39.583-.86.583-1.417 0-.556-.194-1.028-.583-1.417l-6.806-6.777C17.538 12.36 18 10.76 18 9c0-2.48-.88-4.602-2.64-6.36C13.603.88 11.48 0 9 0zm0 15c-1.648 0-3.06-.588-4.236-1.764C3.588 12.06 3 10.648 3 9c0-1.648.588-3.06 1.764-4.236C5.94 3.588 7.352 3 9 3c1.648 0 3.06.588 4.236 1.764C14.412 5.94 15 7.352 15 9c0 1.648-.588 3.06-1.764 4.236C12.06 14.412 10.648 15 9 15z"
                  fill="#D4D4D4"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <form
            action="/search.html"
            className="masthead__search-form clearfix"
            method="get"
          >
            <span className="hide-visually" id="masthead__search-label">
              Search
            </span>
            <input
              aria-labelledby="masthead__search-label"
              className="masthead__search-input"
              name="q"
              placeholder="Search"
              type="text"
            />
            <button className="masthead__search-button" type="submit">
              <span className="hide-text">Search button</span>
              <div className="masthead__search-button__icon">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 0C6.52 0 4.398.88 2.64 2.64.88 4.397 0 6.52 0 9c0 2.48.88 4.602 2.64 6.36C4.397 17.12 6.52 18 9 18c1.76 0 3.36-.463 4.806-1.39l6.777 6.807c.39.39.86.583 1.417.583.556 0 1.028-.194 1.417-.583.39-.39.583-.86.583-1.417 0-.556-.194-1.028-.583-1.417l-6.806-6.777C17.538 12.36 18 10.76 18 9c0-2.48-.88-4.602-2.64-6.36C13.603.88 11.48 0 9 0zm0 15c-1.648 0-3.06-.588-4.236-1.764C3.588 12.06 3 10.648 3 9c0-1.648.588-3.06 1.764-4.236C5.94 3.588 7.352 3 9 3c1.648 0 3.06.588 4.236 1.764C14.412 5.94 15 7.352 15 9c0 1.648-.588 3.06-1.764 4.236C12.06 14.412 10.648 15 9 15z"
                    fill="#D4D4D4"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
      </>
    )
  }
}

export default PageHeader



