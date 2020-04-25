import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
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
    <div>
      <Link to="/">
        <h1>{data.site.siteMetadata.title}</h1>
      </Link>
      <p>
        Oops! Page not found. Go{" "}
        <Link to="/">
          <span>home</span>
        </Link>{" "}
        :)
      </p>
    </div>
  )
}
