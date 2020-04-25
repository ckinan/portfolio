import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default () => {
  return (
    <Layout>
      <div>
        <p>
          Oops! Page not found. Go{" "}
          <Link to="/">
            <span>home</span>
          </Link>{" "}
          :)
        </p>
      </div>
    </Layout>
  )
}
