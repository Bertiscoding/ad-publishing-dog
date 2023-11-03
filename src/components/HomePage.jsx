import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Header from "./shared/Header"
import Footer from "./shared/Footer"
 

const HomePage = () => {

  const queryItems = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
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
  `)

// const siteMetadata = useStaticQuery(graphql`
// query {
//   site: site {
//     siteMetadata {
//       logoLg
//       logoSm
//       }
//     }
//   }
// `)
// console.log('siteMetadata', siteMetadata);

  const mainContainer = {
    minHeight: "100vh",
    paddingTop: 40,
  }
  const mainLogoLarge = {
    width: 300,
    height: "auto",
  }
  const mainLogoLargeImg = {
    width: "100%",
    height: "auto",
  }

  const mainParagraphStyle = {
    fontSize: 18,
    marginTop: 30,
    color: "#515267"
  }

  const itemImgStyle = {
    height: 200,
    width: "auto",
  }
  
  const mapItems = queryItems.posts.edges.map((item, i) => {
    const { slug, linkText, featuredImage } = item.node.frontmatter
    return (
      <a href={slug} key={i}>
        <div>
          <img
            src={featuredImage.publicURL}
            alt={`easy dog training ${linkText}`}
            style={itemImgStyle} />
        </div>
        <h4>{linkText}</h4>
      </a>
    )
  })

  return (
    <div>
      <Header />
      <main style={mainContainer}>
        <div style={mainLogoLarge}>
          <StaticImage
            src=""
            alt="easy dog training"
            style={mainLogoLargeImg}
            width={200}
          />
        </div>
          <h1 style={mainParagraphStyle}>
            This is your go-to hub for stress-free and effective dog training tips! Whether you're a first-time pup parent or a seasoned dog whisperer, our mission is to simplify training while keeping it fun and approachable.
            At easy-dog-training.com, we understand the importance of creating a harmonious bond between you and your furry friend through simple and practical techniques. From basic commands to impressive tricks, our dog training guides are tailored to every skill level, ensuring that you and your pup become a dream team in no time.
            <br/>
            Forget the complex methods; we're all about user-friendly, paws-itively effective strategies. Our approach not only helps your dog learn but also enhances your website experience.
            <br/>
            Join us on this adventure of easy dog training, filled with laughter, learning, and a whole lot of puppy love. Ready to make training a tail-wagging good time? Explore easy-dog-training.com for valuable insights and build a stronger connection with your canine companion.
            <br/>
            Let's fetch those training goals together!
          </h1>
        <section>
          { mapItems }
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
