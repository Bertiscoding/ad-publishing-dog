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
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/favicon-32x32.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-image", {
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
    resolve: `gatsby-plugin-gdpr-cookies`,
    options: {
      googleAnalytics: {
        trackingId: 'G-WVQC1L6FB2', // YOUR_GOOGLE_ANALYTICS_TRACKING_ID leave empty if you want to disable the tracker
        cookieName: 'gatsby-gdpr-google-analytics', // default
        anonymize: true, // default
        allowAdFeatures: false // default
      },
      googleTagManager: {
        trackingId: 'GTM-ABCDEFG', // YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID leave empty if you want to disable the tracker
        cookieName: 'gatsby-gdpr-google-tagmanager', // default
        dataLayerName: 'dataLayer', // default
      },
      // facebookPixel: {
      //   pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
      //   cookieName: 'gatsby-gdpr-facebook-pixel', // default
      // },
      // tikTokPixel: {
      //   pixelId: 'YOUR_TIKTOK_PIXEL_ID', // leave empty if you want to disable the tracker
      //   cookieName: 'gatsby-gdpr-tiktok-pixel', // default
      // },
      // hotjar: {
      //   hjid: 'YOUR_HOTJAR_ID',
      //   hjsv: 'YOUR_HOTJAR_SNIPPET_VERSION',
      //   cookieName: 'gatsby-gdpr-hotjar', // default
      // },
      // linkedin: {
      //   trackingId: 'YOUR_LINKEDIN_TRACKING_ID', // leave empty if you want to disable the tracker
      //   cookieName: 'gatsby-gdpr-linked-in', // default
      // },
      // defines the environments where the tracking should be available  - default is ["production"]
      environments: ['production', 'development']
    },
  }]
};
