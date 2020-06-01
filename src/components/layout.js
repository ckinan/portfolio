import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import cap from "../images/cap.png"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "./codeblock"

const components = {
  code: CodeBlock,
}

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
      <div className="z-40 fixed bg-white w-full p-4 text-center shadow-md">
        <Link className="inline" to="/">
          <img className="h-5 inline pr-2" src={cap} alt="cap" />
          {data.site.siteMetadata.title}
        </Link>
      </div>
      <div className="pt-16">
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>
    </div>
  )
}
