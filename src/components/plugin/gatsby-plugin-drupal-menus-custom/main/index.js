import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const park = process.env.GATSBY_PARK;
const apiDomain = process.env.GATSBY_API_DOMAIN; 

const createMenuHierarchy = (menuData) => {
  const menuName = park + "-top-nav"
  let tree = [],
     mappedArr = {},
     arrElem,
     mappedElem

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = menuData.length; i < len; i++) {
    arrElem = menuData[i].node
    if (arrElem.menu_name === menuName && arrElem.enabled === true) {
      mappedArr[arrElem.drupal_id] = arrElem
      if (arrElem.drupal_parent_menu_item != null && arrElem.drupal_parent_menu_item.includes(arrElem.bundle)) {
        let stripped_drupal_id = arrElem.drupal_parent_menu_item.replace(arrElem.bundle + ':', '')
        mappedArr[arrElem.drupal_id].drupal_parent_menu_item = stripped_drupal_id
      }
      mappedArr[arrElem.drupal_id]['children'] = []
    }
  }

  for (let id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id]
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.drupal_parent_menu_item) {
        mappedArr[mappedElem.drupal_parent_menu_item]['children'].push(mappedElem)
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem)
      }
    }
  }
  return tree
}

const buildLink = link => {
  const $park = "/" + park
  let menuLink 
  if(!link.external) {
    let linkUrl
    if(link.link.uri_alias !=null) {
      linkUrl = link.link.uri_alias.replace($park, '')
    } else {
      linkUrl = link.link.uri.replace("internal:" + $park, '')
    }
    if (link.description != null) {
      menuLink = (
        <a className="feature-box" href={linkUrl}>
          <div className="feature-box__inner">
            <img
              src={`${apiDomain}${link.description}`}
              width="220"
              height="150"
              alt={link.title}
              className="feature-box__image"
            />
            <div className="feature-box__text-overlay feature-box__text-overlay--bottom-left">
              <span>
                <em>{link.title}</em>
              </span>
            </div>
          </div>
        </a>
      )

    } else {
      menuLink = (
        <a href={linkUrl}>{link.title}</a>
      )
    }
  } else {
    if (link.description != null) {
      menuLink = (
        <a className="feature-box" href={link.link.uri_alias}>
          <div className="feature-box__inner">
            <img
              src={`${apiDomain}${link.description}`}
              width="220"
              height="150"
              alt={link.title}
              className="feature-box__image"
            />
            <div className="feature-box__text-overlay feature-box__text-overlay--bottom-left">
              <span>
                <em>{link.title}</em>
              </span>
            </div>
          </div>
        </a>
      )

    } else {
      menuLink = (
        <a href={link.link.uri_alias}>{link.title}</a>
      )
    }
  }
  return (menuLink)
}

const buildMenu = menuArray => {
  if(!menuArray)  {
    return
  }
  const $park = "/" + park
  let menu = []

  for(let item in menuArray) { 
    if(menuArray[item].drupal_parent_menu_item != null) {
      if(menuArray[item].children.length !== 0) { 
        menu.push( 
          <div className="navigation-dropdown__panel-column">
            <div className="navigation-dropdown__panel-column-inner">
              {buildLink(menuArray[item])}                   
              <ul className="navigation-dropdown__panel-list"> 
                {buildMenu(menuArray[item].children)}
              </ul>
            </div>
          </div>
        )   
      } else {
        if(menuArray[item].description != null) {
          menu.push( 
            <div className="navigation-dropdown__panel-column">
              <div className="navigation-dropdown__panel-column-inner">
                {buildLink(menuArray[item])}  
              </div>
            </div> 
          )  
        } else {
          menu.push( 
            <li className="navigation-dropdown__panel-list-item">
              {buildLink(menuArray[item])}  
            </li> 
          )  
        }
      }     
    } else {
      menu.push(
        <li className="navigation-dropdown__item">
          <a href={menuArray[item].link?.uri_alias?.replace($park, '')}
              className="navigation-dropdown__anchor navigation-dropdown__anchor--top-level"
              id={`nav-${menuArray[item].title.toLowerCase().replace(' ', '-')}`}
              >
                <span>{menuArray[item].title}</span>
          </a>       
          <button className="navigation-dropdown__anchor navigation-dropdown__anchor--button">
            <span>{menuArray[item].title}</span>
          </button>
          <div aria-labelledby={`nav-${menuArray[item].title.toLowerCase().replace(' ', '-')}`} className="navigation-dropdown__panel">
            <div className="navigation-dropdown__panel-inner">
              {buildMenu(menuArray[item].children)}
            </div>
          </div>
        </li>
      )
    }
  }
  return menu
}


const generateMenu = (menuLinks) => {
  let menu

  menu = createMenuHierarchy(menuLinks.allMenuItem.edges)
  menu = buildMenu(menu)

  return menu
}
export default function MainMenu () {
  const data = useStaticQuery(graphql`
    query{
      allMenuItem(sort: {fields: weight}, filter: {menu_name: {eq: "uktnp-top-nav"}}) {
        edges {
          node{  
            enabled
            title
            menu_name
            link {
              uri
              uri_alias
            }
            description
            drupal_id
            bundle
            drupal_parent_menu_item
            external
          }
        }
      }
    }
  `) 
  return(
    data?(
        <ul className="navigation-dropdown navigation-dropdown--main clearfix">
          {generateMenu(data)} 
        </ul>
      ):(<ul/>)
    )
  }