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
      <Link to="/">{data.site.siteMetadata.title}</Link>
      {children}
    </div>
  )
}
