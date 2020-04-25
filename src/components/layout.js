import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default ({ children }) => {
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
    <div>
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto p-4">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
      </div>
      {children}
    </div>
  )
}
