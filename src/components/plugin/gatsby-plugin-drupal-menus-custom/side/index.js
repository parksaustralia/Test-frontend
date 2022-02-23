import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const park = process.env.GATSBY_PARK;

const createMenuHierarchy = (menuData) => {
  const menuName = park + "-side-nav-main"
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
  const $park = "internal:/" + park
  if(!link.external && link.link.uri?.includes($park)) {
    return ( 
      <a href={link.link.uri.replace($park, '')}>{link.title}</a>
    )
  } else {
    return ( 
      <a href={link.link.uri}>{link.title}</a>
    )
  }
}

const buildMenu = menuArray => {
  if(!menuArray)  {
    return
  }
  let menu = []
  for(let item in menuArray) {
    if(menuArray[item].children.length !== 0) {
      menu.push(
        <ul className="menu" key={menuArray[item].drupal_id}>
          <li className="menu-item menu-item--expanded menu-item--active-trail">{buildLink(menuArray[item])}</li>
          {buildMenu(menuArray[item].children)}
        </ul>)
    } else {
      menu.push(<li className="menu-item menu-item--expanded menu-item--active-trail" key={menuArray[item].drupal_id}>{buildLink(menuArray[item])}</li>)
    }
  }

  return menu

};

const generateMenu = (menuLinks) => {
  let menu

  menu = createMenuHierarchy(menuLinks.allMenuItem.edges)
  menu = buildMenu(menu)

  return menu
}
export default function SideMainMenu () {
  const data = useStaticQuery(graphql`
    query{
      allMenuItem {
        edges {
          node{  
            enabled
            title
            menu_name
            link {
              uri
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
        <>
          {generateMenu(data)} 
        </>
      ):(<></>)
    )
  }