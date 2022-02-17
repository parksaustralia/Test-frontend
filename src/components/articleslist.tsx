import React from "react";
import { useStaticQuery, graphql } from "gatsby"

export default function ArticlesList({node}) {
  const apiDomain = process.env.GATSBY_API_DOMAIN
  const siteOfArticle = node.field_site_of_article.drupal_internal__target_id
  let park = "uktnp"
  let data;
  if (siteOfArticle == park) {
    data = useStaticQuery(graphql`
      query {
        news: allNodeArticle(
          filter: {
            field_site: {drupal_internal__target_id: {eq: "uktnp"}}
          }
        ) {
          nodes {
            field_article_title {
              value
            }
            field_article_description {
              value
            }
            field_publication_date
            path {
              alias
            }
            relationships {
              field_tile_image {
                relationships {
                  field_media_image {
                    uri {
                      url
                    }
                  }
                }
              }
            }            
          }
        }
      }
    `)
    const articlesArray = data.news || [] 
    const lists = articlesArray.nodes.map((list, i:Number)=> {
      const imgSrc = list.relationships?.field_tile_image?.relationships?.field_media_image?.uri?.url?(apiDomain + list.relationships.field_tile_image.relationships.field_media_image.uri.url):""
      const d = new Date(list.field_publication_date)
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const fullDate = weekday[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + " " +  d.getFullYear();
      return (
        <div className="text-tile text-tile--large clearfix"> 
          <a href={list.path?.alias?(list.path.alias):""}>
              <img className="text-tile__image" src={imgSrc} 
                  width="170" height="170" alt="" /> 
          </a> 
          <div className="text-tile__text-wrapper"> 
            <h3 className="text-tile__title"> 
              <a href={list.path?.alias?(list.path.alias):""}>
              <div dangerouslySetInnerHTML={{ __html:list.field_article_title?.value?(list.field_article_title.value):""}} />
              </a> 
            </h3> 
            <p className="text-tile__body"> 
              <em>{fullDate}</em> <br/> <br/> 
              <div
                    dangerouslySetInnerHTML={{ __html: list.field_article_description?.value?(list.field_article_description.value):"" }}
                  />

              {/* {list.field_article_description?.value?(list.field_article_description.value):""} */}
            </p>
            <a className="call-to-action text-tile--call-to-action t-right" href={list.path?.alias?(list.path.alias):""}> 
              <span>Read more</span> </a> 
          </div> 
        </div>
      )
    })

    return(lists)
  }
}
  