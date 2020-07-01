import React from "react"
import { graphql } from "gatsby"
import { BlogLayout } from "../components/layout"
import { Helmet } from "react-helmet"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "../components/codeblock"

const components = {
  code: CodeBlock,
}

export default ({ data }) => {
  const post = data.mdx
  return (
    <BlogLayout>
      <Helmet
        title={`${post.frontmatter.title} : ${data.site.siteMetadata.title}`}
      />
      <div className="container mx-auto px-4 pt-16 max-w-screen-md">
        <h1 className="leading-tight text-4xl font-semibold mt-4 pb-0">
          {post.frontmatter.title}
        </h1>
        <div className="border-b mt-1 mb-5 text-xs text-gray-600 font-light">
          {post.frontmatter.date}
        </div>
        <div className="markdown">
          <MDXProvider components={components}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </BlogLayout>
  )
}

export const query = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "dddd DD MMMM YYYY")
      }
    }
  }
`
