import React from "react"
import HomePage from "../components/HomePage"
import CookieBanner from "../components/shared/Footer"
import { useCookies, CookiesProvider } from "react-cookie"
import "../styles/style.scss"

const IndexPage = () => {  
  const [cookies] = useCookies(['accepted']);
  console.log('cookies', cookies);
  return (
    <CookiesProvider>
      {!cookies.accepted ? (
          <HomePage />
        ) : (
          <CookieBanner />
        )}
    </CookiesProvider>
  )
}

export default IndexPage
