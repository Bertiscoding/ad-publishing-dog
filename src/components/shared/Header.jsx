import React from "react"
import { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import classNames from "classnames"

export default function Header() {
  const [isNavOpen, setIsMenuOpen] = useState(false)
  const toggleNav = () => {
    setIsMenuOpen(!isNavOpen)
  }

  const navLinks = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              linkText
            }
          }
        }
      }
    }
  `)

  const mapLinks = navLinks.posts.edges.map((el, i) => {
    const {slug, linkText} = el.node.frontmatter
    return (
      <li className="nav-item" key={i}>
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
            src="images/edt-logo-sm.png"
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
    </>
  )
}
