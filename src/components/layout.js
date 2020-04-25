import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import cap from "../images/cap.png"

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
      <div className="text-white-900 shadow-md">
        <div className="container mx-auto p-4 max-w-screen-md text-center">
          <Link className="inline" to="/">
            <img className="h-5 inline pr-2" src={cap} />
            {data.site.siteMetadata.title}
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
