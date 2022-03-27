const excerptReplacements = [
  {
    selector: "strong",
    replaceWith: "p",
  },
  {
    selector: "h6",
    replaceWith: "p",
  },
  {
    selector: "h5",
    replaceWith: "p",
  },
  {
    selector: "h4",
    replaceWith: "p",
  },
  {
    selector: "h3",
    replaceWith: "p",
  },
  {
    selector: "h2",
    replaceWith: "p",
  },
  {
    selector: "h1",
    replaceWith: "p",
  },
];

module.exports = {
  siteMetadata: {
    title: "Vickers",
    author: "Scott Vickers",
    description: "Scott Vickers Website",
    siteUrl: "https://scottwvickers.com",
    social: [
      {
        title: "Github",
        url: "https://github.com/code-vicar",
      },
      {
        title: "StackOverflow",
        url: "http://stackoverflow.com/users/4599499/scott-vickers?tab=profile",
      },
      {
        title: "Linkedin",
        url: "https://www.linkedin.com/in/scottwvickers",
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/apps/notes/content`,
        name: "notes",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-excerpts",
      options: {
        sources: {
          default: {
            type: "htmlQuery",
            sourceField: "html",
            excerptSelector: "html > *",
            stripSelector: "a",
            elementReplacements: excerptReplacements,
            truncate: {
              length: 100,
              byWords: true,
              ellipsis: "…",
            },
          },
        },
        sourceSets: {
          markdownHtml: ["default"],
        },
        excerpts: {
          snippet: {
            type: "html",
            nodeTypeSourceSet: {
              MarkdownRemark: "markdownHtml",
            },
          },
        },
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-133812755-2",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Scott Vickers Website",
        short_name: "Vickers",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "content/assets/logs.png",
      },
    },
    "gatsby-plugin-mui-theme-provider",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-apps",
      options: {
        basePath: "src/apps",
        apps: ["notes", "meals"],
      },
    },
    {
      resolve: "gatsby-plugin-notes",
      options: {
        sourceInstanceName: "notes",
        templatePath: "src/apps/notes/templates/note.tsx",
      },
    },
  ],
};
