import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
              }
              excerpt
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>

      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <span>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>{" "}
              <span> - {node.frontmatter.date}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
