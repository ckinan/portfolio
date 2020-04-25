import React from "react"
import { graphql, Link } from "gatsby"
export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div>
      <Link to="/">
        <h1>{data.site.siteMetadata.title}</h1>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}
export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
