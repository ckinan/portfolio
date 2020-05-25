import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({ data }) => {
  const post = data.mdx
  return (
    <Layout>
      <Helmet
        title={`${post.frontmatter.title} : ${data.site.siteMetadata.title}`}
      />
      <div className="container mx-auto p-4 max-w-screen-md">
        <h1 className="leading-tight text-4xl font-semibold mt-4 pb-0">
          {post.frontmatter.title}
        </h1>
        <div className="border-b mt-1 mb-5 text-xs text-gray-600">
          {post.frontmatter.date}
        </div>
        <div className="markdown">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </div>
    </Layout>
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
