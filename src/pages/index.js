import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
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
    <Layout>
      <div>
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
    </Layout>
  )
}
