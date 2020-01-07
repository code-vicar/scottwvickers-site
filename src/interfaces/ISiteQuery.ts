export interface ISocialSite {
  title: string,
  url: string
}

export interface ISiteMetaData {
  title: string;
  author: string;
  description: string;
  social: Array<ISocialSite>
  siteUrl: string;
}
