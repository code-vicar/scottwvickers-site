import React from 'react'
import { Link, graphql } from 'gatsby'
import { Typography } from '@material-ui/core'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { rhythm } from '../utils/typography'
import {
  ISiteMetaData,
  IMarkdownQueryFields,
  IMarkdownQueryFrontmatter,
  IGatsbyPageProps
} from '../interfaces'

interface IMarkdownNode {
  excerpt: string;
  fields: Pick<IMarkdownQueryFields, 'slug'>;
  frontmatter: Pick<IMarkdownQueryFrontmatter, 'date' | 'description' | 'title'>
}

interface Props extends IGatsbyPageProps {
  data: {
    site: {
      siteMetadata: Pick<ISiteMetaData, 'title'>
    },
    allMarkdownRemark: {
      edges: Array<{ node: IMarkdownNode; }>
    }
  }
}

const AllNotes: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const notes = data.allMarkdownRemark.edges

  return (
    <Layout
      location={location}
      title={siteTitle}
    >
      <SEO title="All Notes" />
      <Typography component="h2">All Notes</Typography>
      {notes.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default AllNotes

export const pageQuery = graphql`
  query allNotesListQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
