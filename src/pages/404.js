import React from "react"
import { Link } from "gatsby"
import { HomeLayout } from "../components/layout"

export default () => {
  return (
    <HomeLayout>
      <div className="flex flex-col items-center">
        <p>
          Oops! Page not found. Go
          <Link
            className="inline border-solid border-b-2 border-gray-900 font-medium mx-1"
            to="/"
          >
            Home
          </Link>
          :)
        </p>
      </div>
    </HomeLayout>
  )
}
