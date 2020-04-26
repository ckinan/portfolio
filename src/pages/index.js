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
            <div
              key={node.id}
              className="hover:bg-gray-100 border-b overflow-hidden"
            >
              <span>
                <Link
                  className="grid grid-cols-1 lg:grid-cols-6 p-3"
                  to={node.fields.slug}
                >
                  <span className="col-span-6 lg:col-span-4">
                    {node.frontmatter.title}
                  </span>
                  <span className="col-span-6 lg:col-span-2 text-left text-xs text-gray-600 lg:text-right">
                    {node.frontmatter.date}
                  </span>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
