import React, { useState, useEffect} from "react"
import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import { useCookies } from "react-cookie"
import CookieBanner from "../shared/CookieBanner"
import classNames from "classnames"
import "../../styles/style.scss"

import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module'

export default function Header() {
  const [cookies] = useCookies();
  const { title } = useSiteMetadata()
  const location = useLocation()

  const [showBanner, setShowBanner] = useState(false)
  const [isNavOpen, setIsMenuOpen] = useState(false)
  const [loadGa, setLoadGa] = useState(false)
  const [loadGtm, setLoadGtm] = useState(false)
  const [loadEzoic, setLoadEzoic] = useState(false)

  const toggleNav = () => {setIsMenuOpen(!isNavOpen)}

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      return;
    } else {
      if(cookies.google_analytics) {
        setLoadGa(true)
        ReactGA.initialize(process.env.GATSBY_GA_ID)
      }
      if (cookies.google_tagmanager) {
        setLoadGtm(true)
        TagManager.initialize({ gtmId: process.env.GATSBY_GTM_ID})
      }
      if (cookies.thirdparty_ads){
        setLoadEzoic(true)
      }
    }
  }, [cookies.google_analytics, cookies.google_tagmanager, cookies.thirdparty_ads])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development'){
      return;
    } else {
      if (loadGa) {
        ReactGA.pageview(location.pathname)
      }
      if (loadGtm) {
        TagManager.dataLayer({
          dataLayer: {
            event: 'pageview',
            pagePath: location.pathname,
            pageTitle: title,
          },
        })
      }
    }
  }, [location])

  useEffect(() => {
    if (loadGa) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_ID}`;
  
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'analytics_storage': 'granted'
        });
        gtag('js', new Date());
        gtag('config', '${process.env.GATSBY_GA_ID}', {
          cookie_flags: 'max-age=7200;secure;samesite=none',
        });
      `;
  
      document.head.appendChild(gaScript);
      document.head.appendChild(configScript);
    } else {  
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied',
          'wait_for_update': 500,
        });
        gtag('js', new Date());
        gtag('config', '${process.env.GATSBY_GA_ID}', {
          cookie_flags: 'max-age=7200;secure;samesite=none',
        });
      `;
      document.head.appendChild(configScript);
    }
  },[loadGa])

  useEffect(() => {
    if (loadGtm) {
      // Google Tag Manager script for head
      const headScript = document.createElement('script');
      headScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GATSBY_GA_ID}');
      `;
      document.head.appendChild(headScript);
  
      // Google Tag Manager noscript iframe for body
      const bodyScript = document.createElement('noscript');
      bodyScript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GATSBY_GA_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.appendChild(bodyScript);
    }
  }, [loadGtm]);

  useEffect(() => {
    if (loadEzoic) {
      window.ezConsentCategories = window.ezConsentCategories || {};
      window.__ezconsent = window.__ezconsent || {};

      window.ezConsentCategories.preferences = true;
      window.ezConsentCategories.statistics = true;
      window.ezConsentCategories.marketing = true;

      const scriptElement = document.createElement("script");
      scriptElement.innerHTML = `
        if (typeof ezConsentCategories == 'object' && typeof __ezconsent == 'object') {
          window.ezConsentCategories.preferences = true;
          window.ezConsentCategories.statistics = true;
          window.ezConsentCategories.marketing = true;

          if(typeof __ezconsent.setEzoicConsentSettings === 'function') {
            __ezconsent.setEzoicConsentSettings(window.ezConsentCategories);
          }
        }
      `;
      document.head.appendChild(scriptElement);
    }
  }, [loadEzoic])

  useEffect(() => {
    if ((!cookies.accepted && process.env.NODE_ENV !== 'development')) {
      const timeout = setTimeout(() => {
        setShowBanner(true)
      }, 2000);
      return () => clearTimeout(timeout)
    }
    return;
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
    if (id !== 0) {
      return (
        <li id={id} className="nav-item" key={i}>
          <a href={slug} className="nav-link">{linkText}</a>
        </li>
      )
    }
  })
  const sortedItems = mapLinks.sort((a, b) => { 
    return  a.props.children.props.children.localeCompare(b.props.children.props.children)
  })

  return (
    <>
    {cookies.thirdparty_ads && (
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5251463929015203" crossOrigin="anonymous"></script>
    )}
      <nav className="nav">
        <div className="nav-wrapper">
        <a href="/" className="nav-logo">
          <img
            src="../images/edt-logo-sm.png"
            alt="easy dog training logo"
            width={25}
          />
        </a>
          <ul className={classNames("nav-menu", isNavOpen ? "active" : "")}>{sortedItems}</ul>
        <div className={classNames("hamburger", isNavOpen ? "active" : "")} onClick={toggleNav}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        </div>
      </nav>
      { showBanner ? (
          (!cookies.accepted && process.env.NODE_ENV !== 'development') && (
            <CookieBanner />
          )
        ) : null
      }
    </>
  )
}
