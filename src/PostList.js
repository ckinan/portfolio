import React from 'react';
import { Link } from "react-router-dom";

class PostList extends React.Component {
    render() {
        return (
            <div>
                <h1>Articles</h1>
                <div className="post-list-item">
                    <span className="date">22-Aug-2019</span>
                    <span className="title">
                        <Link to="/react-js/">ReactJS</Link>
                    </span>
                </div>
                <div className="post-list-item">
                    <span className="date">20-Aug-2019</span>
                    <span className="title"><a href="#">Building my website</a></span>
                </div>
                <div className="post-list-item">
                    <span className="date">15-Aug-2019</span>
                    <span className="title"><a href="#">Hello World!</a></span>
                </div>
            </div>
          );
    }
}

export default PostList;
