import React from "react"
import { graphql } from "gatsby"
import Text from 'mineral-ui/Text';
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"

class Bio extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Text>Hi, I'm Scott Vickers</Text>
        <Text
          style={{
            marginBottom: rhythm(1),
          }}
        >
          A Software Engineer currently living and working in Seattle
        </Text>
      </Layout>
    )
  }
}

export default Bio

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
