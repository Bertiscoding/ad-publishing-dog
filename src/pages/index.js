import React from "react"
import HomePage from "../components/HomePage"
import CookieBanner from "../components/shared/CookieBanner"
import { useCookies, CookiesProvider } from "react-cookie"
import "../styles/style.scss"

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
