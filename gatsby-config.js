/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `easy-dog-training`,
    siteUrl: `https://www.easy-dog-training.com`,
    description: `Master dog training at home! Discover breed-specific tips and tricks for effective, fun training. Your guide for stress-free dog training!`,
    image: `images/edt-logo-lg.png`,
    logo: `images/edt-logo-sm.png`,
  },
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/favicon-32x32.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  "gatsby-plugin-sharp",
  "gatsby-transformer-remark",
  {
    resolve: "gatsby-transformer-remark",
      options:{
       commonmark: true,
       footnotes: true,
       pedantic: true,
       gfm: true,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
       mdxOptions: {
         remarkPlugins: [],
         rehypePlugins: [],
       },
    },
  },
]
};
