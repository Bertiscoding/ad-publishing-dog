import React from "react"
import HomePage from "../components/HomePage"
import "../styles/style.scss"
import { CookiesProvider } from "react-cookie"
import { Seo } from "../components/Seo"

const IndexPage = () => {  
  return (
    <CookiesProvider>
      <HomePage />
    </CookiesProvider>
  )
}

export default IndexPage

export const Head = () => (
  <Seo />
)
