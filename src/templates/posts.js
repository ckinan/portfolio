import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-screen-md">
        <h1 className="leading-tight text-4xl font-semibold mt-4 pb-0">
          {post.frontmatter.title}
        </h1>
        <div className="border-b mt-1 mb-5 text-xs text-gray-600">
          {post.frontmatter.date}
        </div>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd DD MMMM YYYY")
      }
    }
  }
`
