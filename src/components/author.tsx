/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Typography from "@mui/material/Typography"
import { rhythm } from "../utils/typography"
import { GatsbyImage } from "gatsby-plugin-image"

export const Author: React.FC = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.(?:jpg|png)/" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED,
            width: 50,
            height: 50
          )
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  const author = data.site.siteMetadata.author
  return (
    <div
      style={{
        display: "flex",
        marginBottom: rhythm(2.5),
        alignItems: "center"
      }}
    >
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: "100%"
        }}
        imgStyle={{
          borderRadius: "50%"
        }}
      />
      <Typography
        style={{
          fontWeight: "bold"
        }}
      >
        {author}
      </Typography>
    </div>
  )
}
