import React from "react"
import HomePage from "../components/HomePage"
import CookieBanner from "../components/shared/CookieBanner"
import { useCookies, CookiesProvider } from "react-cookie"
import "../styles/style.scss"
import { Seo } from "../components/seo"

const IndexPage = () => {  
  const [cookies] = useCookies(['accepted']);

  return (
    <CookiesProvider>
      {cookies.accepted ? (
          <HomePage />
        ) : (
          <CookieBanner />
        )}
    </CookiesProvider>
  )
}

export default IndexPage

export const Head = () => (
  <Seo />
)
