import React, { useState, useEffect} from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import { useCookies } from "react-cookie"
import CookieBanner from "../shared/CookieBanner"
import classNames from "classnames"

import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module'

export default function Header() {
  const [cookies] = useCookies();
  const { logo } = useSiteMetadata()

  const [showBanner, setShowBanner] = useState(false)
  const [isNavOpen, setIsMenuOpen] = useState(false)
  const toggleNav = () => {
    setIsMenuOpen(!isNavOpen)
  }

  useEffect(() => {
    if(cookies.google_analytics) ( ReactGA.initialize('G-WVQC1L6FB2'))
    if(cookies.google_tagmanager) ( TagManager.initialize({
      gtmId: 'GTM-ABCDEFG'
  }))
  }, [cookies])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBanner(true)
    }, 3000);
    return () => clearTimeout(timeout)
  }, [])

  const navLinks = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              id
              slug
              linkText
            }
          }
        }
      }
    }
  `)

  const mapLinks = navLinks.posts.edges.map((el, i) => {
    const {id, slug, linkText} = el.node.frontmatter
    return (
      <li id={id} className="nav-item" key={i}>
        <a href={slug} className="nav-link">{linkText}</a>
      </li>
    )
  }) 

  return (
    <>
      <nav className="nav">
        <div className="nav-wrapper">
        <a href="/" className="nav-logo">
          <img
            src={`${window.location.origin}/${logo}`}
            alt="easy dog training logo"
            width={25}
          />
        </a>
          <ul className={classNames("nav-menu", isNavOpen ? "active" : "")}>{mapLinks}</ul>
        <div className={classNames("hamburger", isNavOpen ? "active" : "")} onClick={toggleNav}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        </div>
      </nav>
      { showBanner ? (
          !cookies.accepted && (
            <CookieBanner />
          )
        ) : null
      }
    </>
  )
}
