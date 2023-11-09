import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const Seo = ({ title, description, image, url, children }) => {
  const { title: defaultTitle, description: defaultDescription, image: defaultImage, url: siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || `${siteUrl}/${defaultImage}`,
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
      { children }
    </>
  )
}