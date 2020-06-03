import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { HomeLayout } from "../components/layout"
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
    <HomeLayout>
      <Helmet title={`Home : ${data.site.siteMetadata.title}`} />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-end">
          <div className="font-extrabold text-5xl lg:text-6xl border-b">
            Cesar Kina
          </div>
          <div className="font-light text-2xl">Software Engineer</div>
          <div className="font-light text-2xl">Lima, Perú</div>
        </div>
      </div>
    </HomeLayout>
  )
}
