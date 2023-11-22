import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useCookies } from "react-cookie"
import Header from "./shared/Header"
import Footer from "./shared/Footer"
 

const HomePage = () => {
  const [sortBy, setSortBy] = useState('popular')
  const [cookies] = useCookies();

  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              id
              slug
              linkText
              featuredImage {
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  const mainContainer = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
  const mainLogoLarge = {
    width: 200,
    height: "auto",
    marginTop: 30,
  }
  const mainLogoLargeImg = {
    width: "100%",
    height: "auto",
  }

  const mainParagraphStyle = {
    fontSize: 18,
    color: "#515267",
    padding: 15,
    maxWidth: 830,
    lineHeight: 1.3,
    marginTop: 15
  }

  const itemImgStyle = {
    height: 100,
    borderRadius: 10,
  }

  const sectionStyle = {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    padding: 15,
  }

  const sectionWrapperStyle = {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
  }

  const itemLinkStyle = {
    textDecoration: "none",
    margin: "15px 5px",
    width: 160,
  }

  const linkTextStyle = {
    color: "#EB9486",
    textAlign: "center",
    marginTop: 10,
  }


    const mapItems = data.posts.edges.map((item, i) => {
    const { id, slug, linkText, featuredImage } = item.node.frontmatter
    if (id !== 0) {
      return (
        <a id={id} href={slug} key={i} style={itemLinkStyle}>
          <div style={itemImgStyle}>
            <div
              title={`easy dog training ${linkText}`}
              style={featuredImage ? {backgroundImage: `url(${featuredImage.publicURL})`} : {backgroundColor: '#97A7B3'}}
              className="hp-background-img"
            >
            </div>
          </div>
          <h4 style={linkTextStyle}>{linkText}</h4>
        </a>
      )
    }
  })

  const sortedItems =  mapItems.sort((a, b) => { 
    if (sortBy === 'popular') {
      return a.props.id - b.props.id
    } else {
      return a.props.children[1].props.children.localeCompare(b.props.children[1].props.children)
    }
  })

  return (
    <div>
      <Header />
      <section id="ab-top" className="ab-top-section">
        {cookies.thirdparty_ads && (
            <script src="//servedby.eleavers.com/ads/ads.php?t=MjkyOTk7MTk2NTM7c3F1YXJlLm1lZGl1bV9yZWN0YW5nbGU=&index=1"></script>
        )}
      </section>
      <div className="page-container-wrapper">
        <div id="ab-left"></div>
        <main style={mainContainer} className="page-container">
          <div style={mainLogoLarge}>
            <img
              src="images/edt-logo-lg.png"
              alt="easy dog training"
              style={mainLogoLargeImg}
            />
          </div>
          <h1 style={mainParagraphStyle}>
            This is your go-to hub for stress-free and effective dog training tips! Whether you're a first-time pup parent or a seasoned dog whisperer, our mission is to simplify training while keeping it fun and approachable.
            <br/>
            <br/>
            At easy-dog-training.com, we understand the importance of creating a harmonious bond between you and your furry friend through simple and practical techniques. From basic commands to impressive tricks, our dog training guides are tailored to every skill level, ensuring that you and your pup become a dream team in no time.
            <br/>
            <br/>
            Forget the complex methods; we're all about user-friendly, paws-itively effective strategies. Our approach not only helps your dog learn but also enhances your own experience.
            <br/>
            <br/>
            Ready to make training a tail-wagging good time? Explore easy-dog-training.com for valuable insights and build a stronger connection with your canine companion.
            <br/>
            <br/>
            Find our training-guides down below!
          </h1>
          <section id="ab-mid"></section>
          <div className="sort-items_container">
            <select name="sortItems" id="sortItems" defaultValue={'popular'} className="sort-items" onChange={e => setSortBy(e.target.value)}>
              <option value="popular" >Sort by popularity</option>
              <option value="atoz">Sort A-Z</option>
            </select>
          </div>
          <section style={sectionStyle}>
            <div style={sectionWrapperStyle}>
              { sortedItems }
            </div>
          </section>
        </main>
        <div id="ab-right"></div>
      </div>
      <section id="ab-bottom"></section>
      <Footer />
    </div>
  )
}

export default HomePage
