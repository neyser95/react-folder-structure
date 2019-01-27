import React, { Component } from 'react';
import Tree from './Tree.jsx';

class App extends Component {
  constructor() {
    super(),
    this.state = {
      url: 'https://raw.githubusercontent.com/hyperscience/interview-problems/master/treePaths.json'
    }
  }

  render() {
    return (
      <Tree url={this.state.url} />
    );
  }
}

export default App;