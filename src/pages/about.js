import React from 'react'
import { graphql } from 'gatsby'
import Text from 'mineral-ui/Text'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'

class About extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About" />
        <div
          style={{
            marginBottom: rhythm(1),
          }}
        >
          <Text>
            Hi, I'm Scott Vickers,
          </Text>
          <Text>
            a software engineer currently living and working in Seattle.
          </Text>
          <Text>
            This is my website.
          </Text>
        </div>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
