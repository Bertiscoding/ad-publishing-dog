import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Seo = ({ title, description, image, url, children }) => {
  const { title: defaultTitle, description: defaultDescription, image: defaultImage, url: siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || `${defaultImage}`,
    url: url || siteUrl
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description"  content={seo.description} />
      <meta name="image"  content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta name="google-site-verification" content="-HCSRS0gcE81KKVnGBgstPQtJuiEEI0GTALmnkXViUU" />
      <meta name="google-adsense-account" content="ca-pub-5251463929015203">
      { children }
    </>
  )
}

export default Seo;
