const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const getSlugValue = (node, getNode) => {
  if (node.frontmatter.permalink) {
    return node.frontmatter.permalink;
  }
  return createFilePath({ node, getNode });
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    sourceInstanceName: Joi.string()
      .required()
      .description("The 'name' option from gatsby-source-filesystem"),
    templatePath: Joi.string()
      .required()
      .description("Path to the notes template"),
  });
};

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;

  const noteTemplate = path.resolve(options.templatePath);
  const result = await graphql(
    `
    query Notes($sourceInstanceName: StringQueryOperatorInput = {eq: "${options.sourceInstanceName}"}) {
      allFile(filter: {sourceInstanceName: $sourceInstanceName}) {
        nodes {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }    
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create note pages.
  const nodes = result.data.allFile.nodes;
  nodes.forEach((node, index, allNodes) => {
    const remark = node.childMarkdownRemark;
    const previous =
      index === allNodes.length - 1
        ? null
        : allNodes[index + 1].childMarkdownRemark;
    const next = index === 0 ? null : allNodes[index - 1].childMarkdownRemark;
    createPage({
      path: remark.fields.slug,
      component: noteTemplate,
      context: {
        slug: remark.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const value = getSlugValue(node, getNode);
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};
