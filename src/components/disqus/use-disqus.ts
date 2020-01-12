import { useStaticQuery, graphql } from 'gatsby'
import { ISiteMetaData } from '../../interfaces'

interface SiteUrlQuery {
  site: {
    siteMetadata: Pick<ISiteMetaData, 'siteUrl'>
  }
}

export interface DisqusConfig {
  url: string
  identifier: string
  title: string
}

export const shortname = 'pushmodo'

export const useDisqus = (): {
  shortname: string
  config: Pick<DisqusConfig, 'url'>
} => {
  const {
    site: {
      siteMetadata: {
        siteUrl
      }
    }
  } = useStaticQuery<SiteUrlQuery>(graphql`
    query DisqusQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  return {
    shortname,
    config: {
      url: siteUrl
    }
  }
}
