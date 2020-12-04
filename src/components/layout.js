import React from "react"
import { Link } from "gatsby"
import Footer from "./footer"

export const BlogLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <div className="z-40 fixed w-full p-4 text-center shadow-md bg-white">
          <Link
            className="inline mx-2 border-solid border-b-2 border-gray-900"
            to="/"
          >
            Blog
          </Link>
          <Link className="inline mx-2 font-thin" to="/about">
            About
          </Link>
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export const AboutLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <div className="z-40 fixed w-full p-4 text-center shadow-md bg-white">
          <Link className="inline mx-2 font-thin" to="/">
            Blog
          </Link>
          <Link
            className="inline mx-2 border-solid border-b-2 border-gray-900"
            to="/about"
          >
            About
          </Link>
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
