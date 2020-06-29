import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { BlogLayout } from "../components/layout"
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
                monthYear: date(formatString: "MMMM YYYY")
                day: date(formatString: "ddd DD")
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

  const getPosts = () => {
    let currentMonthYear = ""
    let renderMonthYear = true

    return data.allMdx.edges.map(({ node }) => {
      renderMonthYear = node.frontmatter.monthYear !== currentMonthYear
      if (renderMonthYear) {
        currentMonthYear = node.frontmatter.monthYear
      }

      return (
        <div key={node.id}>
          {renderMonthYear ? (
            <div className="font-semibold">{node.frontmatter.monthYear}</div>
          ) : (
            <></>
          )}
          <div className="border-l-4 my-2 ml-2 pl-2">
            <span className="text-gray-600 font-light">
              {node.frontmatter.day}:
            </span>
            <span className="ml-2">
              <Link className="hover:underline" to={node.fields.slug}>
                <span>{node.frontmatter.title}</span>
              </Link>
            </span>
          </div>
        </div>
      )
    })
  }

  return (
    <BlogLayout>
      <Helmet title={`Blog : ${data.site.siteMetadata.title}`} />
      <div className="container mx-auto px-4 pt-16 mb-2 max-w-screen-md">
        <div>{getPosts()}</div>
      </div>
    </BlogLayout>
  )
}
