import React from "react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import { useCookies } from "react-cookie"
import Header from "../components/shared/Header"
import Footer from "../components/shared/Footer"
import Seo from "../components/Seo"
import "../styles/style.scss"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  let featuredImg = frontmatter.featuredImage.publicURL
  const [cookies] = useCookies();

  const frameWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
      <section id="ab-top" className="ab-top-section">
        {cookies.thirdparty_ads && (
          <script src="//servedby.studads.com/ads/ads.php?t=MTk0Mzg7MTMwMjE7c3F1YXJlLnNxdWFyZV9ib3g=&index=1"></script>
        )}
      </section>
      <div className="page-container-wrapper">
        <div id="ab-left"></div>
        <div style={frameWrapper} className="page-container">
          <div style={frame}>
            <h1 style={headingH1}>{frontmatter.title}</h1>
            <h3 style={summaryStyle}>{frontmatter.summary}</h3>
            <p style={dateStyle}>{frontmatter.date}</p>
            <div
              title={frontmatter.title}
              style={featuredImg ? {backgroundImage: `url(${featuredImg})`} : {backgroundColor: '#97A7B3'}}
              className="lp-background-img"
            ></div>
            <section id="ab-mid"></section>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
        <div id="ab-right"></div>
      </div>
      <section id="ab-bottom"></section>
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
