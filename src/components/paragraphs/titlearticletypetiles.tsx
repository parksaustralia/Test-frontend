import React, { useState } from "react";
import { graphql } from "gatsby"
import ArticlesList  from "../articleslist"
// import slugify from 'react-slugify'

export const TitleArticleTypeTilesParagraph = ({ node }) => {
  const paragraphTitle = node.field_article_type_tiles_title.value
  const siteCode = node.field_site_of_article.value
  const typeOfArticle = node.field_select_article_type
  const articlesView = <ArticlesList node={node} />
  return(
   <section className="pb-medium"> 
    <div className="grid-wrapper"> 
      <div className="grid-row clearfix"> 
        <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0">
          <div className="copy">
            <section className="pt-small"> 
              <div className="grid-wrapper"> 
                <div className="grid-row clearfix"> 
                  <div className="grid-col grid-col--12"> 
                    <h2 id="latest-news" className="section__heading pb-small" dangerouslySetInnerHTML={{ __html: paragraphTitle }}/> 
                  </div> 
                </div> 
                <div className="grid-row"  key="list-${i}"> 
                  <div className="grid-col grid-col--12"> 
                    {articlesView}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export const fragment = graphql`
  fragment ParagraphTitlearticletypetiles on paragraph__title_article_type_tiles {
    field_select_article_type
    field_article_type_tiles_title {
      value
    }    
    field_site_of_article {
      drupal_internal__target_id
    }
  }
`;