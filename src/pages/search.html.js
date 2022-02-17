import * as React from "react";
import {Helmet} from "react-helmet"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const searchResultPage = () => {
  return (
    <main style={pageStyles}>
      <title>Search</title>
      <div className="page-header__heading-wrapper clearfix"> <h1 className="page-header__heading"> Search </h1> </div>
      <div>
        <Helmet>
        <script async src="https://www.google.com/cse/cse.js?cx=016358939440689128450:1dtgrjjgmqs"></script>
        </Helmet>
        <div className="gcse-searchresults-only"></div>
      </div>
    </main>
  );
};

export default searchResultPage