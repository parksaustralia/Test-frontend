const path = require("path");

const park = process.env.GATSBY_PARK;

// const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

async function createAllPages(createPage, pageTemplate, articleTemplate, informationTemplate, graphql) {
  const result = await graphql(
    `
      query($park: String!) {
        pages: allNodePage(
          filter: {
            field_site: { drupal_internal__target_id: { eq: $park } }
            path: { alias: { ne: null } }
          }
        ) {
          nodes {
            drupalId: drupal_id
            path {
              alias
            }
            body {
              value
            }
          }
        }

        articles: allNodeArticle(
          filter: {
            field_site: { drupal_internal__target_id: { eq: $park } }
            path: { alias: { ne: null } }
          }
          ) {
            nodes {
              drupalId: drupal_id
              path {
                alias
              }            
              body {
                value
              }
            }
        }  
        
        infos: allNodeInformation(
          filter: {
            field_site: { drupal_internal__target_id: { eq: $park } }
            path: { alias: { ne: null } }
          }
          ) {
            nodes {
              drupalId: drupal_id
              path {
                alias
              }            
              body {
                value
              }
            }
        }  
      }
    `,
    { park }
  );

  result.data.pages.nodes.forEach((node) => {
    let path = node.path.alias.replace(`/${park}`, "");

    if (path == "") {
      path = "/";
    }

    createPage({
      path,
      component: pageTemplate,
      context: {
        park:`${park}`,
        drupalId: node.drupalId,
      },
    });
  });   

  result.data.articles.nodes.forEach((node) => {
    let path = node.path.alias.replace(`/${park}`, "");

    if (path == "") {
      path = "/";
    }

    createPage({
      path,
      component: articleTemplate,
      context: {
        park:`${park}`,
        drupalId: node.drupalId,
      },
    });
  });
  
  result.data.infos.nodes.forEach((node) => {
    let path = node.path.alias.replace(`/${park}`, "");

    if (path == "") {
      path = "/";
    }

    createPage({
      path,
      component: informationTemplate,
      context: {
        park:`${park}`,
        drupalId: node.drupalId,
      },
    });
  });   
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`src/templates/page.tsx`);
  const articleTemplate = path.resolve(`src/templates/article.tsx`)
  const informationTemplate = path.resolve(`src/templates/information.tsx`)
  await createAllPages(createPage, pageTemplate, articleTemplate, informationTemplate, graphql);
};

// exports.onCreateNode = async ({
//   node,
//   actions: { createNode, createNodeField },
//   store,
//   cache,
//   createNodeId,
//   reporter
// }) => {
//   // if (node.internal.type === `node__page`) {
//   //   const slug = node.drupal_id;
//   //   createNodeField({
//   //       node,
//   //       name: `slug`,
//   //       value: slug
//   //   });
//   // }  
//   // For all nodes that have a file which hasn't been downloaded, call createRemoteFileNode
//   // if (node.internal.type === "file__file" && node.localFile !== null) {
//   if (node.internal.type === "file__file") {
//     const url = node.uri.url;

//     try {
//       const fileNode = await createRemoteFileNode({
//         url, // string that points to the URL of the image
//         parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
//         createNode, // helper function in gatsby-node to generate the node
//         createNodeId, // helper function in gatsby-node to generate the node id
//         cache, // Gatsby's cache
//         store, // Gatsby's redux store
//         reporter // Gatsby's reporter
//       });

//       // if the file was created, attach the new node to the parent node
//       if (fileNode) {
//         node.localFile___NODE = fileNode.id;
//       }
//     } catch (error) {
// 		// If you are depending on the localfile existing in page queries, then a hard error might be preferable to stop Gatsby from
//       reporter.warn(error);
//     }
//   }
// }
