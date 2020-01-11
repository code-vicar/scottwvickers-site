/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { Typography } from '@material-ui/core'
import { rhythm } from '../utils/typography'

export const Author: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.(?:jpg|png)/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
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
        display: 'flex',
        marginBottom: rhythm(2.5),
        alignItems: 'center'
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <Typography
        style={{
          fontWeight: 'bold'
        }}
      >
        {author}
      </Typography>
    </div>
  )
}
