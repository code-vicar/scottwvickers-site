import React from "react"
import { Link, graphql } from "gatsby"
import { Author as Bio } from "../../../components/author"
import { Layout } from "../../../components/layout"
import { SEO } from "../../../components/seo"
import { rhythm, scale } from "../../../utils/typography"
import { NotesNav } from "../components/nav/notes-nav"
import {
  ISiteMetaData,
  IBlogPostContext,
  IMarkdownQueryFields,
  IMarkdownQueryFrontmatter,
  IGatsbyPageProps
} from "../../../interfaces"

interface IPageQuery {
  site: {
    siteMetadata: Pick<ISiteMetaData, "title" | "author">;
  }
  markdownRemark: {
    id: string;
    excerpt: string;
    html: string;
    fields: Pick<IMarkdownQueryFields, "slug">
    frontmatter: Pick<IMarkdownQueryFrontmatter, "date" | "description" | "title">;
  };
}

interface Props extends IGatsbyPageProps {
  data: IPageQuery
  pageContext: IBlogPostContext;
}

const NoteTemplate: React.FC<Props> = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle} MainNav={NotesNav}>
      <SEO
        title={post.frontmatter.title || post.fields.slug}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              marginBottom: rhythm(1)
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title || previous.fields.slug}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title || next.fields.slug} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default NoteTemplate

export const pageQuery = graphql`
  query NoteBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
