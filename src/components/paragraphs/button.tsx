import React from "react";
import { Link } from "gatsby";

const park = process.env.GATSBY_PARK;

// interface Props {
//   style: "alternate" | "triangle" | "alternate triangle";
//   text: string;
//   uri: string;
// }

// export default function Button(props: Props) {
export default function Button(props) {
  const classNames = {
    alternate: "button--alternate",
    triangle: "button--with-triangle",
    "alternate triangle": "button--alternate button--with-triangle",
  };

  const regex = new RegExp(`^\/${park}`);

  let to = props.uri.replace(regex, "");

  if (to == "") {
    to = "/";
  }
  
  if (to.startsWith("/")) {
    return (
      <Link to={to} className={`button ${classNames[props.style]}`}>
        <span>{props.text}</span>
      </Link>
    );
  }

  return (
    <a href={to} className={`button ${classNames[props.style]}`}>
      <span>{props.text}</span>
    </a>
  );
}
