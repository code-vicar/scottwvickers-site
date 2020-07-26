import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { ISiteMetaData, IGatsbyPageProps } from '../interfaces'
import { HomeNav } from '../components/mainNav/home-nav'

interface Props extends IGatsbyPageProps {
  data: {
    site: {
      siteMetadata: Pick<ISiteMetaData, 'title'>
    }
  }
}

const NotFoundPage: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location={location} title={siteTitle} MainNav={HomeNav}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>Why are you still procrastinating?</p>
      <p>
        Check{' '}
        <a
          href="http://waitbutwhy.com/2013/11/how-to-beat-procrastination.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          this
        </a>{' '}
        {"out if you want to stop looking for pages that don't exist"}
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
