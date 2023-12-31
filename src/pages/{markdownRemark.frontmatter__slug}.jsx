import React, { useRef, useLayoutEffect } from "react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import ReactDOMServer from 'react-dom/server';
import { useCookies } from "react-cookie"
import Header from "../components/shared/Header"
import Footer from "../components/shared/Footer"
import Seo from "../components/Seo"
import "../styles/style.scss"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { frontmatter, html } = markdownRemark
  let featuredImg = frontmatter.featuredImage.publicURL
  const [cookies] = useCookies();
  const indexId = frontmatter.id
  const getMidMarker = html.indexOf('<h2>Channeling Energy: Physical and Mental Exercise</h2>');
  const beforeAdScript = html.slice(0, getMidMarker);
  const afterAdScript = html.slice(getMidMarker);
  const scriptContainerOneRef = useRef();
  const scriptContainerTwoRef = useRef();
  const scriptContainerThreeRef = useRef();
  const scriptContainerFourRef = useRef();

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

  const scriptContainers = [
    { id: 1, ref: scriptContainerOneRef, source: `https://servedby.studads.com/ads/ads.php?t=MTk0Mzg7MTMwMjE7c3F1YXJlLnNxdWFyZV9ib3g=&index=${indexId}` },
    { id: 2, ref: scriptContainerTwoRef, source: `https://servedby.eleavers.com/ads/ads.php?t=MjkyOTk7MTk2NTM7c3F1YXJlLm1lZGl1bV9yZWN0YW5nbGU=&index=${indexId}` },
    { id: 3, ref: scriptContainerThreeRef, source: `https://servedby.studads.com/ads/ads.php?t=MTk0Mzg7MTMwNDM7c3F1YXJlLnNxdWFyZV9ib3g=&index=${indexId}` },
    { id: 4, ref: scriptContainerFourRef, source: `https://servedby.eleavers.com/ads/ads.php?t=MjkyOTk7MTk2OTM7c3F1YXJlLnNxdWFyZV9ib3g=&index=${indexId}` },
  ];

  useLayoutEffect(() => {
    scriptContainers.forEach(({ ref, source }) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = source;
      scriptElement.async = true;
  
      if (ref.current && cookies.thirdparty_ads) {
        ref.current.appendChild(scriptElement);
      }
    });
  }, [scriptContainerOneRef, scriptContainerTwoRef, scriptContainerThreeRef, scriptContainerFourRef, cookies.thirdparty_ads]);

  const adScriptToInsert = ReactDOMServer.renderToStaticMarkup(
    <center id="ab-bottom" className="ab-bottom-section" ref={scriptContainerFourRef}></center>
  );

  return (
    <>
      <Header />
      <div className="page-container-wrapper">
        {(cookies.thirdparty_ads && (indexId !== 0)) && (
          // <section id="ab-left" className="ab-left-section">
          <section id="ab-left">
            <div id="ezoic-pub-ad-placeholder-106"> </div>
          </section>
        )}
        <div style={frameWrapper} className="page-container">
          <div style={frame}>
            {(cookies.thirdparty_ads && (indexId !== 0)) && (
              <center id="ab-mid" className="ab-mid-section" ref={scriptContainerThreeRef}></center>
            )}
            <h1 style={headingH1}>{frontmatter.title}</h1>
            <h3 style={summaryStyle}>{frontmatter.summary}</h3>
            <p style={dateStyle}>{frontmatter.date}</p>
            <div
              title={frontmatter.title}
              style={featuredImg ? {backgroundImage: `url(${featuredImg})`} : {backgroundColor: '#97A7B3'}}
              className="lp-background-img"
            ></div>
            {(cookies.thirdparty_ads && (indexId !== 0)) && (
              <center id="ab-mid" className="ab-mid-section" ref={scriptContainerTwoRef}></center>
            )}
            <div dangerouslySetInnerHTML={{ __html: beforeAdScript + adScriptToInsert + afterAdScript }} /></div>
        </div>
        {(cookies.thirdparty_ads && (indexId !== 0)) && (
          // <section id="ab-right" className="ab-right-section">
          <section id="ab-right">
            <div id="ezoic-pub-ad-placeholder-107"> </div>
          </section>
        )}
      </div>
      {(cookies.thirdparty_ads && (indexId !== 0)) && (
        <center id="ab-bottom" className="ab-bottom-section" ref={scriptContainerOneRef}></center>
      )}
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
