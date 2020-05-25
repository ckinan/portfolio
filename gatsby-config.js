/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `ckinan`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-155856844-1`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        plugins: [`gatsby-remark-images`],
        extensions: [".mdx", ".md"],
      },
    },
  ],
}
