import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    header = (
      <div>
          <ul className="nav">
              <li>
                  <Link to={`/`}>
                      <img src="https://img.icons8.com/bubbles/96/000000/home-page.png" alt="Home"/>
                  </Link>
              </li>
              <li>
                  <a href="https://www.linkedin.com/in/ckina/" target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/color/96/000000/linkedin-circled.png" alt="Linkedin"/>
                  </a>
              </li>
              <li>
                  <a href="https://github.com/ckinan" target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/color/96/000000/github.png" alt="GitHub"/>
                  </a>
              </li>
              <li>
                  <a href="https://www.hackerrank.com/ckina" target="_blank" rel="noopener noreferrer">
                      <img src="https://hrcdn.net/fcore/assets/brand/h_mark_sm-966d2b45e3.svg" alt="HackerRank"/>
                  </a>
              </li>
          </ul>
      </div>
    )
    return (
      <div>
        <header>{header}</header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
