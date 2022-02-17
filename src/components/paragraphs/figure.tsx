import React from "react";
import { graphql } from "gatsby";

export const FigureParagraph = ({ node }) => {
  const apiDomain = process.env.GATSBY_API_DOMAIN; 
  const className = `figure-float-${node.field_align}`;
  //alt={props.data.relationships.image.meta.alt}
  return(
    <section className="pb-small">
    <div className="grid-wrapper">
        <div className="grid-row clearfix">
            <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0 intro-section copy">    
            <figure className={className}>
            <img src={`${apiDomain}${node.relationships.field_image.relationships.field_media_image.uri.url}`}/>
            </figure>
            {node.text?.processed? (
                        <div
                        dangerouslySetInnerHTML={{ __html: node.text.processed }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    </section>    
  );
};
export const fragment = graphql`
  fragment ParagraphFigure on paragraph__figure {
    text: field_figure_left_text {
      format
      processed
      value
    }
    field_align
    relationships {
      field_image {
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
`;

// import React from "react";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";
// import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";

// // We should transform this data prior to it reaching the component
// interface Props {
//   data: {
//     align: "right" | "left" | "center";
//     caption: string | null;
//     relationships: {
//       image: {
//         meta: {
//           height: Number;
//           title: string;
//           width: Number;
//           alt: string;
//         };
//         name: string;
//         relationships: {
//           image: {
//             filename: string;
//             localFile: FileNode & { publicURL: string };
//           };
//         };
//       };
//     };
//   };
// }

// export default function Figure(props: Props) {
//   const image = getImage(
//     props.data.relationships.image.relationships.image.localFile
//   );

//   const className = `figure-float-${props.data.align}`;

//   return (
//     <figure className={className}>
//       {image ? (
//         <GatsbyImage
//           image={image}
//           alt={props.data.relationships.image.meta.alt}
//         />
//       ) : (
//         <img
//           src={
//             props.data.relationships.image.relationships.image.localFile
//               .publicURL
//           }
//         />
//       )}
//     </figure>
//   );
// }

