import React from "react";
import { graphql } from "gatsby";
import Button from "./button";

export const ButtonsParagraph = ({ node }) => {
  const buttons = node.links.map((link, index: Number) => {
    return (
      <Button
        key={`button-${index}`}
        style={node.style}
        text={link.title}
        uri={link.uri || link.uri_alias}
      />
    );
  });

  const classNames = [
    "buttons",
    `t-${node.field_align || "left"}`,
  ];

  return(<section className="pb-small"> 
    <div className="grid-wrapper"> 
      <div className="grid-row clearfix">
        <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0 intro-section copy"> 
          <p className={classNames.join(" ")}>{buttons}</p>;
        </div>
      </div> 
    </div>
  </section>
  );            
};      

export const fragment = graphql`
  fragment ParagraphButtons on paragraph__buttons {
      id
      field_align
      style: field_style
      wrapperClasses: field_wrapper_classes
      links: field_link {
        title
        uri
        uri_alias
      }
  }
`;

// import React from "react";
// import Button from "./button";

// export default function Buttons({ data }) {
//   const buttons = data.links.map((link, index: Number) => {
//     return (
//       <Button
//         key={`button-${index}`}
//         style={data.style}
//         text={link.title}
//         uri={link.uri_alias || link.uri}
//       />
//     );
//   });

//   const classNames = [
//     "buttons",
//     `t-${data.align || "left"}`,
//     ...data.wrapperClasses,
//   ];

//   return <p className={classNames.join(" ")}>{buttons}</p>;
// }