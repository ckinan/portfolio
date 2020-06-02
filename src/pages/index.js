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
        allMdx(sort: { order: DESC, fields: frontmatter___date }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "ddd DD MMMM YYYY")
                status
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
          {data.allMdx.edges.map(({ node }) => (
            <div
              key={node.id}
              className="hover:bg-gray-100 border-b overflow-hidden"
            >
              <span>
                <Link
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-3"
                  to={node.fields.slug}
                >
                  <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center">
                    <span>{node.frontmatter.title}</span>
                    {node.frontmatter.status === "IN_PROGRESS" ? (
                      <span className="lg:ml-2 bg-yellow-300 text-yellow-700 text-xs mt-1 lg:mt-0 font-thin px-2 border-solid border-2 border-yellow-400 rounded-lg">
                        In progress
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">
                      {node.frontmatter.date}
                    </span>
                  </div>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
