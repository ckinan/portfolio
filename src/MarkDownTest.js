import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import MyMdPath from './hello-world.md';

class MarkDownTest extends Component {
    constructor(props) {
      super(props)
  
      this.state = { myMd: null }
    }
  
    componentWillMount() {
      fetch(MyMdPath).then((response) => response.text()).then((text) => {
        this.setState({ myMd: text })
      })
    }
  
    render() {
      return (
        <div className="content">
          <ReactMarkdown source={this.state.myMd} />
        </div>
      )
    }
  }
  
  export default MarkDownTest