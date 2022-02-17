require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Parks Australia",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    {
//       resolve: "gatsby-plugin-google-analytics",
//       options: {
//         trackingId: "FIXME",
//       },
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GATSBY_GTM_ID,
        includeInDevelopment: false,
        defaultDataLayer: { platform: `gatsby`, branch: process.env.BRANCH },
      },      
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve(`./src/components/layout.tsx`),
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
        },
        emitPluginDocuments: {
          "src/__generated__/gatsby-plugin-documents.graphql": true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: "https://api.parksaustralia.gov.au",
        // fastBuilds: true, // has issue with Drupal API key
        // params: {
        //   "api-key": process.env.API_KEY,
        // },
        skipFileDownloads: true,
        // disallowedLinkTypes: [`media--app_image`],
        // filters: {
        //   Use includes so only the files associated with our decoupled content
        //   types are included.
        //   "node--page": "include=field_hero",
        //   "paragraph--figure": "include=field_media_image",
        //   "file--file": ""
        // },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-load-script',
    //   options: {
    //     src: '/info-pullout.js', // Change to the script filename
    //   },
    // },

//     `gatsby-plugin-react-helmet`,
//     `gatsby-plugin-image`,
//     {
//       resolve: `gatsby-source-filesystem`,
//       options: {
//         name: `images`,
//         path: `${__dirname}/src/images`,
//       },
//     },
//     `gatsby-transformer-sharp`,
//     `gatsby-plugin-sharp`,
//     {
//       resolve: `gatsby-plugin-manifest`,
//       options: {
//         name: `gatsby-starter-default`,
//         short_name: `starter`,
//         start_url: `/`,
//         background_color: `#663399`,
//         // This will impact how browsers show your PWA/website
//         // https://css-tricks.com/meta-theme-color-and-trickery/
//         // theme_color: `#663399`,
//         display: `minimal-ui`,
//         icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
//       },
//     },    
//    {
//      resolve: `gatsby-source-drupal`,
//      options: {
//        baseUrl: `https://dev-pa-cms.pantheonsite.io`,
//        // fastBuilds: true, // has issue with Drupal API key
//        params: {
//          "api-key": process.env.API_KEY,
//        },
//      },
//    }, 
  ],
};
