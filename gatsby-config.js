const path = require('path')

module.exports = {
  siteMetadata: {
    site: `Atte Sarkonen`,
    title: `Atte Sarkonen`,
    titleTemplate: `%s`,
    description: `Just being me`,
    siteUrl: `https://attesarkonen.fi`,
    language: `en`,
    color: `#ffffff`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Atte Sarkonen`,
        short_name: `Atte Sarkonen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        include_favicon: true, // Include favicon
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-preload-fonts`,
  ],
}
