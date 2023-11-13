import React from "react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import Header from "../components/shared/Header"
import Footer from "../components/shared/Footer"
import AdBannerTop from "../components/shared/AdBannerTop"
import AdBannerBottom from "../components/shared/AdBannerBottom"
import Seo from "../components/Seo"
import "../styles/style.scss"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  let featuredImg = frontmatter.featuredImage.publicURL

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

  return (
    <>
      <Header />
      <div style={frameWrapper}>
        <div style={frame}>
          <h1 style={headingH1}>{frontmatter.title}</h1>
          <h3 style={summaryStyle}>{frontmatter.summary}</h3>
          <p style={dateStyle}>{frontmatter.date}</p>
          <div
            title={frontmatter.title}
            style={featuredImg ? {backgroundImage: `url(${featuredImg})`} : {backgroundColor: '#97A7B3'}}
            className="lp-background-img"
          ></div>
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

export const Head = ({data}) => {
  const location = useLocation()
  const { title, description, featuredImage } = data.markdownRemark.frontmatter
  return (
    <Seo
      title={title}
      description={description}
      image={featuredImage.publicURL}
      url={ location.href }
    />
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
        description
        featuredImage {
          publicURL
        }
      }
    }
  }
`
