import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

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
                date(formatString: "ddd DD MMMM YYYY")
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
      <Helmet title={data.site.siteMetadata.title} />
      <div className="container mx-auto p-4 max-w-screen-md">
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id} className="hover:bg-gray-200">
              <span className="grid grid-cols-1 lg:grid-cols-6 border-b py-2">
                <Link
                  className="col-span-6 lg:col-span-4"
                  to={node.fields.slug}
                >
                  {node.frontmatter.title}
                </Link>
                <span className="col-span-6 lg:col-span-2 text-left text-xs text-gray-600 lg:text-right">
                  {node.frontmatter.date}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
