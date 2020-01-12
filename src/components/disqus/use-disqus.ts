import { useStaticQuery, graphql } from 'gatsby'
import { ISiteMetaData } from '../../interfaces'

interface SiteUrlQuery {
  site: {
    siteMetadata: Pick<ISiteMetaData, 'siteUrl'>
  }
}

export const shortname = 'pushmodo'

export const useDisqus = (): {
  shortname: string
  siteUrl: string
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
    siteUrl
  }
}
