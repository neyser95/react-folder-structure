import React, { Component } from 'react';
import Node from './Node.jsx';

class Tree extends Component {
  constructor(props) {
    super(),
      this.state = {
        directory: {}
      }
  }

  //* Creates directory object. With some parent-child relationship. Rush version. Does not handle duplicate childs.
  createDirectoryObject(array, directory = {}) {
    array.forEach((element, i) => {
      let arr = element.split('/');
      for (let i = 1; i < arr.length; i++) {
        if (directory[arr[1]] !== undefined) {
          directory = this.directoryDepth(arr, directory, i);
        } else {
          directory[arr[i]] = {
            name: arr[i]
          }
        }
      }
    });
    return directory;
  }

  directoryDepth(array, directory, index) {
    if (directory[array[1]].children === undefined) {
      let newChild = {
        name: array[index]
      }
      directory[array[1]].children = [];
      directory[array[1]].children.push(newChild);
    } else {
      let newChild = {
        name: array[index]
      }
      directory[array[1]].children.push(newChild);
    }

    return directory;
  }

  createNodes(directory) {
    return Object.keys(directory).sort((a, b) => a.localeCompare(b)).map((el, i) => {
      el = directory[el];
      if (el.children !== undefined) {
        return <Node key={i} folder={el} children={this.createChildNodes(el.children)} />
      } else {
        return <Node key={i} folder={el} />
      }
    });
  }

  createChildNodes(children) {
    return children.map((el, i) => {
      return <Node key={`child${i}`} folder={el} />
    });
  }

  //* Makes fetch request to get JSON
  componentDidMount() {
    fetch(this.props.url)
      .then(res => {
        return res.json();
      }).then(res => {
        const directory = this.createDirectoryObject(res.data);
        this.setState({ directory });
      });
  }

  render() {
    //* recursion most likely needed to create lower subfolders. Works only for first level.
    const nodes = this.createNodes(this.state.directory);

    return (
      [nodes]
    );
  }
}

export default Tree;
