import React, { useState, useEffect } from "react"
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
  const [showAdScript, setShowAdScript] = useState(null);
  const location = useLocation()

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
    marginTop: 40,
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

  const renderAds = (id) => {
    const timeout = setTimeout(() => {
      if (id % 2 === 0) {
        setShowAdScript(<script src={`${location.protocol}//servedby.studads.com/ads/ads.php?t=MTk0Mzg7MTMwMjE7c3F1YXJlLnNxdWFyZV9ib3g=&index=${id}`}></script>);
      } else {
        setShowAdScript(<script src={`${location.protocol}//servedby.eleavers.com/ads/ads.php?t=MjkyOTk7MTk2NTM7c3F1YXJlLm1lZGl1bV9yZWN0YW5nbGU=&index=${id}`}></script>);
      }
    }, 2700);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    renderAds(frontmatter.id);
  }, []);

  const renderShowAds = showAdScript ? (
    // <center id="ab-mid" className="ab-mid-section">
    <center id="ab-mid">
      <script src={showAdScript.props.src}></script>
    </center>
  ) : null

  return (
    <>
      <Header />
      {(cookies.thirdparty_ads && frontmatter.id !== 0) && (
        // <center id="ab-top" className="ab-top-section">
        <center id="ab-top">
          <div id="ezoic-pub-ad-placeholder-103"> </div>
        </center>
      )}
      <div className="page-container-wrapper">
        {(cookies.thirdparty_ads && frontmatter.id !== 0) && (
          // <section id="ab-left" className="ab-left-section">
          <section id="ab-left">
            <div id="ezoic-pub-ad-placeholder-106"> </div>
          </section>
        )}
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
            {(cookies.thirdparty_ads && frontmatter.id !== 0) && ( renderShowAds )}
            <div
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
        {(cookies.thirdparty_ads && frontmatter.id !== 0) && (
          // <section id="ab-right" className="ab-right-section">
          <section id="ab-right">
            <div id="ezoic-pub-ad-placeholder-107"> </div>
          </section>
        )}
      </div>
      {(cookies.thirdparty_ads && frontmatter.id !== 0) && ( renderShowAds )}
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
