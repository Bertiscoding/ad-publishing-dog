import React from "react"

const Footer = () => {
  const footerWrapper = {
    backgroundColor: "#272635",
    color: "#DEFFFC",
    padding: "30px 15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
  const footerContainer = {
    display: "flex",
  }
  const mainLogoLarge = {
    width: "auto",
    height: 60,
  }
  const mainLogoLargeImg = {
    width: "auto",
    height: "100%",
  }
  const copyRightStyle = {
    marginTop: 20,
    fontWeight: 400,
    textAlign: "center",
  }
  const linkWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: 830,
    width: "100%",
    height: 60,
    justifyContent: "space-around",
    marginLeft: 30,
  }
  const linkStyle = {
    textDecoration: "none",
    color: "#EB9486",
    fontSize: 12,
    fontWeight: 400,
  }

  const currentYear =  new Date().getFullYear();

  return (
    <div style={footerWrapper}>
      <div style={footerContainer}>
        <div style={mainLogoLarge}>
            <img
              src="/images/edt-logo-lg.png"
              alt="easy dog training"
              style={mainLogoLargeImg}
            />
          </div>
          <div style={linkWrapperStyle}>
            <a style={linkStyle} href="/imprint">Imprint</a>
            <a style={linkStyle} href="/dataprotection">Data protection</a>
          </div>
      </div>
      <div style={copyRightStyle}>&copy; {currentYear} </div>
    </div>
  )
}

export default Footer
