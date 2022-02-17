import React from "react";
import { graphql } from "gatsby";

export const TextParagraph = ({ node }) => (
    <section className="pb-small">
    <div className="grid-wrapper">
        <div className="grid-row clearfix">
            <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0 intro-section copy">    
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
    // <div
    //     style={{
    //         borderStyle: "solid",
    //         marginBottom: 3
    //     }}
    // >
    //     <div dangerouslySetInnerHTML={{ __html: node.text.processed }} />
    // </div>
);

export const fragment = graphql`
    fragment ParagraphText on paragraph__text {
      id
      text: field_body {
          format
          processed
          value
      }
    }
`;
// export default function Text({ data }) {
//     return (
//       <div
//         dangerouslySetInnerHTML={{
//           __html: data.body.processed,
//         }}
//       />
//     );
//   }