import React from 'react'
import { graphql } from 'gatsby'
import { Section } from '../components/section'
import { Layout } from '../components/layout'
import { About } from '../components/about'
import { Contact } from '../components/contact'
import { SEO } from '../components/seo'
import { NotesPeek } from '../components/notes_peek'
import { ISiteMetaData, IGatsbyPageProps } from '../interfaces'

interface Props extends IGatsbyPageProps {
  data: {
    site: {
      siteMetadata: Pick<ISiteMetaData, 'title'>
    }
  }
}

export const SiteIndex: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout
      location={location}
      title={siteTitle}
    >
      <SEO title="Home" />
      <Section>
        <About id="about" />
      </Section>
      <Section>
        <NotesPeek id="notes" />
      </Section>
      <Section>
        <Contact id="contact" />
      </Section>
    </Layout>
  )
}

export default SiteIndex

export const pageQuery = graphql`
  query homeQuery {
    site {
      siteMetadata {
        title
      }
    } 
  }
`
