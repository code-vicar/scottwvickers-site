import { IMarkdownQueryFields, IMarkdownQueryFrontmatter } from '.'

// see gatsby-node.js createPages function for the source of this context definition
interface IBlogPostContextMarkdownNode {
  fields: Pick<IMarkdownQueryFields, 'slug'>;
  frontmatter: Pick<IMarkdownQueryFrontmatter, 'title'>;
}

export interface IBlogPostContext {
  slug: string;
  previous: IBlogPostContextMarkdownNode;
  next: IBlogPostContextMarkdownNode;
}
