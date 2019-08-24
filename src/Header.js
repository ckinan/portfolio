import React from 'react';
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <ul className="nav">
                    <li>
                        <Link to="/">
                            <a href="http://ckina.com">
                                <img src="https://img.icons8.com/bubbles/30/000000/home-page.png" />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/ckina/">
                            <img src="https://img.icons8.com/color/30/000000/linkedin-circled.png" />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ckinan">
                            <img src="https://img.icons8.com/color/30/000000/github.png" />
                        </a>
                    </li>
                </ul>
            </div>
          );
    }
}

export default Header;
