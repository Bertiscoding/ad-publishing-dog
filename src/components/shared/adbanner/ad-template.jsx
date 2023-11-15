import React from "react"
import classNames from "classnames"

const AdTemplate = (props) => {
  const { bannerHeight, bannerWidth, children, position } = props
  const adBannerWrapper = {
    backgroundColor: "#97A7B3",
    height: bannerHeight,
    width: bannerWidth,
    margin: "20px 0px",
  }

  const positioning = classNames(position)

  return (
    <div style={adBannerWrapper} className={positioning}>
      {children}
    </div>
  )
}

export default AdTemplate
