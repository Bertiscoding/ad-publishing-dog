import React, { useState } from "react"
import { useLocation } from "@reach/router"
import { useCookies } from "react-cookie";

const CookieBanner = () => {
  const location = useLocation()

  const [showCookieBanner, setShowCookieBanner] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [categories, setCategories] = useState(["essential"]);
  const [_, setCookie, removeCookie] = useCookies(["accepted"]);

  const saveSettings = () => {
   if (categories.includes("analytics")) {
      setCookie("google_analytics", true, location)
      setCookie("google_tagmanager", true, location)
    } else {
      removeCookie("google_analytics", true, location)
      removeCookie("google_tagmanager", true, location)
    }

    if(categories.includes("thirdpartyads")) {
      setCookie("thirdparty_ads", true, location)
    } else {
      removeCookie("google_analytics", true, location)
    }
    setCookie("accepted", true);
    setShowCookieBanner(!showCookieBanner)
  }

  const saveAllCookies = () => {
    setCookie("google_analytics", true, location)
    setCookie("google_tagmanager", true, location)
    setCookie("thirdparty_ads", true, location)
    setCookie("accepted", true, location);
    setShowCookieBanner(!showCookieBanner)
  }

  const handleChangeSettings = (el) => {
    const { id } = el.target
    if (categories.indexOf(id) === -1) {
      setCategories([...categories, id]);
      return;
    }
  }

  const cookieTitleStyle = {
    fontSize: 24,
    marginBottom: 15,
  }
  const cookieBannerWrapperStyle = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    backgroundColor: "RGBA(222, 255, 252, 0.9",
    zIndex: 100,
  }
  const cookieBannerContainerStyle= {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 360,
    backgroundColor: "#515267",
    padding: 20,
    borderRadius: 20,
    color: "#DEFFFC",
    height: "auto",
    maxHeight: "70vh",
    zIndex: 200,
  }
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 25,
  }
  const buttonGhostStyle = {
    backgroundColor: "#515267",
    border: "1px solid #EB9486",
    borderRadius: 7,
    color: "#EB9486",
    padding:" 8px 20px",
    fontSize: 14,
    fontWeight: 600,
  }
  const buttonFullStyle = {
    backgroundColor: "#EB9486",
    border: "1px solid #EB9486",
    borderRadius: 7,
    color: "#515267",
    padding:" 8px 20px",
    fontSize: 14,
    fontWeight: 600,
  }

  const selectionContainerStyle = {
    display: "flex",
    flexDirection: "column",
  }
  const selectionLabelStyle = {
    marginTop: 15,
  }
  const selectionCheckboxStyle = {
    marginRight: 10,
  }

  return (
    showCookieBanner && (
      !showSettings ? (
        <div style={cookieBannerWrapperStyle}>
          <div style={cookieBannerContainerStyle}>
          <h4 style={cookieTitleStyle}>This websites uses cookies.</h4>
          <p>We use cookies to make the site work better. If you allow us to do so by clicking by clicking on&nbsp;
            <span style={{color: '#eb9486', fontWeight: 600, cursor: 'pointer'}} onClick={saveAllCookies}>"Accept Cookies"</span>.
            You can also choose which cookies you want to allow.</p>
          <div style={buttonContainerStyle}>
            <button style={buttonGhostStyle} onClick={() => setShowSettings(!showSettings)}>Personalize</button>
            <button style={buttonFullStyle} onClick={saveAllCookies}>Accept Cookies</button>
          </div>
          </div>
        </div>
      ) : (
        <div style={cookieBannerWrapperStyle}>
        <div style={cookieBannerContainerStyle}>
        <h4 style={cookieTitleStyle}>This websites uses cookies.</h4>
        <p>We use cookies to make the site work better. If you allow us to do so by clicking by clicking on "Accept all cookies".
          You can also choose which cookies you want to allow.</p>
        <div style={selectionContainerStyle}>
          <label htmlFor="essential" style={selectionLabelStyle}>
            <input type="checkbox" name="essential" id="essential" style={selectionCheckboxStyle} checked disabled />
            Essential
          </label>
          <label htmlFor="analytics" style={selectionLabelStyle}>
            <input type="checkbox" name="analytics" id="analytics" style={selectionCheckboxStyle} onChange={handleChangeSettings} />
            Analytics
          </label>
          <label htmlFor="thirdpartyads" style={selectionLabelStyle}>
            <input type="checkbox" name="thirdpartyads" id="thirdpartyads" style={selectionCheckboxStyle} onChange={handleChangeSettings} />
            Third Party Interest
          </label>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonGhostStyle} onClick={saveSettings}>Save selection</button>
          <button style={buttonFullStyle} onClick={saveAllCookies}>Accept all cookies</button>
        </div>
        </div>
      </div>
      )
    )
  )
}

export default CookieBanner
