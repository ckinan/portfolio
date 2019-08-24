import React from 'react';
import PostList from './PostList';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Hi, Cesar here</h1>
                <p>Software Developer</p>
                <p>Some years of experience coding</p>
                <p>Hopefully, today, I will learn something new</p>
                <PostList />
            </div>
          );
    }
}

export default Home;
