import React from "react";
import { FigureParagraph } from "./paragraphs/figure";
import { ButtonsParagraph } from  "./paragraphs/buttons";
import { TabsImageTilesParagraph }  from "./paragraphs/tabsimagetiles"
import { TitleArticleTypeTilesParagraph } from "./paragraphs/titlearticletypetiles"
import { EmbedmapParagraph} from  "./paragraphs/embedmap"

const components = {
    paragraph__figure: FigureParagraph,
    paragraph__buttons: ButtonsParagraph,
    paragraph__title_tab_image_tiles: TabsImageTilesParagraph,
    paragraph__title_article_type_tiles: TitleArticleTypeTilesParagraph,
    paragraph__embed_map: EmbedmapParagraph
};

export const getParagraph = node => {
    if (components.hasOwnProperty(node.type)) {
        const ParagraphComponent = components[node.type];
        return <ParagraphComponent key={node.type.id} node={node} />;
    }
    return <p key={node.type.id}>Unknown type {node.__typename}</p> ;
};

// import React from "react";
// import { graphql } from "gatsby";

// import Buttons from "./paragraphs/buttons";
// import Figure from "./paragraphs/figure";
// import Text from "./paragraphs/text";

// interface ParagraphsInterface {
   
// }
// export default function Paragraphs(props) {
//   const paragraphs = props.paragraphs
//     .filter((paragraph) => !!paragraph.paragraphType)
//     .map((paragraph, index: Number) => {
//       if (paragraph.paragraphType.type == "buttons") {
//         return <Buttons key={`paragraph-${index}`} data={paragraph} />;
//       }

//       if (paragraph.paragraphType.type == "text") {
//         return <Text key={`paragraph-${index}`} data={paragraph} />;
//       }

//       if (paragraph.paragraphType.type == "figure") {
//         return <Figure key={`paragraph-${index}`} data={paragraph} />;
//       }
//     });

//   return <div>{paragraphs}</div>;
// }

// export const query = graphql`
//   fragment paragraphs on node__pageRelationships {
//       field_paragraphs {
//       ... on paragraph__text {
//         body: field_body {
//           processed
//         }
//         paragraphType: paragraph_type {
//           type: drupal_internal__target_id
//         }
//       }
//       ... on paragraph__buttons {
//         align: field_align
//         style: field_style
//         wrapperClasses: field_wrapper_classes
//         links: field_link {
//           title
//           uri
//           uri_alias
//         }
//         paragraphType: paragraph_type {
//           type: drupal_internal__target_id
//         }
//       }
//       ... on paragraph__figure {
//         align: field_align
//         caption: field_caption {
//           value
//         }
//         paragraphType: paragraph_type {
//           type: drupal_internal__target_id
//         }
//         relationships {
//           image: field_image {
//             meta: field_media_image {
//               height
//               title
//               width
//               alt
//             }
//             name
//             relationships {
//               image: field_media_image {
//                 filename
//                 localFile {
//                   childImageSharp {
//                     gatsbyImageData(layout: CONSTRAINED, width: 200)
//                   }
//                   publicURL
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
