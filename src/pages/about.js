import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AboutLayout } from "../components/layout"
import { Helmet } from "react-helmet"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <AboutLayout>
      <Helmet title={`Blog : ${data.site.siteMetadata.title}`} />
      <div className="container mx-auto px-4 pt-16 mb-6 max-w-screen-md">
        <h1 className="leading-tight text-4xl mt-4 pb-0 font-semibold">
          About
        </h1>
        <div className="border-b mt-1 mb-5 text-xs text-gray-600 font-light">
          Self-introduction
        </div>
        <div className="font-light">
            Cesar Kina, Software Engineer, Lima - Perú
        </div>
      </div>
    </AboutLayout>
  )
}
