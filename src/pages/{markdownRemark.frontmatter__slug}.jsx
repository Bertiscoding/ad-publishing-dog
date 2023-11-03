import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Header from "../components/shared/Header"
import Footer from "../components/shared/Footer"
import AdBannerTop from "../components/shared/AdBannerTop"
import AdBannerBottom from "../components/shared/AdBannerBottom"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  let featuredImg = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)

  const frameWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  }

  const frame = {
    color: "#272635",
    margin: 15,
    maxWidth: 830,
  }

  const headingH1 = {
    color: "#EB9486",
    fontSize: 32,
    fontWeight: 600,
    marginTop: 30,
  }

  const dateStyle = {
    fontSize: 12,
    textAlign: "right",
    margin: "15px 0",
  }

  const summaryStyle = {
    fontSize: 18,
    marginTop: 30,
  }

  const featuredImgWrapper = {
    display: "flex",
    justifyContent: "center",
  }

  const featuredImgStyle = {
    maxWidth: 830,
  }

  return (
    <>
      <Header />
      <div style={frameWrapper}>
        <div style={frame}>
          <h1 style={headingH1}>{frontmatter.title}</h1>
          <h3 style={summaryStyle}>{frontmatter.summary}</h3>
          <p style={dateStyle}>{frontmatter.date}</p>
          <div style={featuredImgWrapper}>
            <GatsbyImage
              image={featuredImg}
              loading={featuredImg.lazy}
              alt={frontmatter.title}
              style={featuredImgStyle}
              objectFit="none"
              objectPosition="50% 50%"
              constrained
            />
          </div>
          <AdBannerTop />
          <div
            dangerouslySetInnerHTML={{ __html: html }}
          />
        <AdBannerBottom />
        </div>
      </div>
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        id
        title
        slug
        date
        summary
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
