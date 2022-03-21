import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Typography from "@mui/material/Typography"

interface Props {
  id: string
}

export const NotesPeek: React.FC<Props> = ({ id }) => {
  const data = useStaticQuery(graphql`
    query NotesPeekQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1
      ) {
        edges {
          node {
            excerpt(format: HTML)
            snippet
            fields {
              slug
            }
            frontmatter {
              date(formatString: "DD MMM YYYY")
              title
              description
            }
          }
        }
      }
    }
  `)
  const notes = data.allMarkdownRemark.edges
  if (!notes) {
    return null
  }
  const note = notes[0].node
  return (
    <>
      <div
        id={id}
        className="offset-anchor"
      />
      <Typography
        style={{
          fontWeight: "bold"
        }}
      >
        Latest Note
      </Typography>
      <Typography>
        {note.frontmatter.date}{" "}
        <Link
          to={note.fields.slug}
        >
          {note.frontmatter.title}
        </Link>
      </Typography>
      <div
        dangerouslySetInnerHTML={{
          __html: note.snippet
        }}
      />
      <div>
        <Link
          to={"/notes"}
        >
          See All Notes
        </Link>
      </div>
    </>
  )
}
