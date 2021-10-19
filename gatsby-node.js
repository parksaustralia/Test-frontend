const path = require("path");

const park = process.env.PARK;

async function createAllPages(createPage, pageTemplate, graphql) {  
  const result = await graphql(
    `
      query {
        pages: allNodePage(
          filter: {
            path: { alias: { ne: null } }
          }
        ) {
          edges {
            node {
              path {
                alias
              }
            }
          }
        }
      }
    `,
    { park }
  );    

  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.path.alias,
      component: pageTemplate,
      context: {
        slug: node.path.alias,
      },
    });
  });    
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`src/templates/page.tsx`);
  await createAllPages(createPage, pageTemplate, graphql);
};
