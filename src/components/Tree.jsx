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
    return array.reduce((acc, curr, index, array) => {
      curr = curr.replace(/\//g, ' ').trim();
      let arr = curr.split(' ');
      for (let i = 0; i < arr.length; i++) {
        if (i > 1) { break; }
        if (!acc[arr[0]]) {
          acc[arr[i]] = {
            name: arr[i],
            children: []
          };
        } else {
          const arrCopy = arr.slice().splice(1);
          acc[arr[0]].children.push(
            ...this.directoryDepthHelper(acc[arr[0]].children, arr[i], arrCopy)
          );
        }
      }
  
      return acc;
    }, {});
  }
  
  directoryDepthHelper(childrenArr, item, currentArr) {
    return currentArr.reduce((acc, curr, index, currentArr) => {
      // console.log(curr, currentArr);
      let childExists = false;
  
      if (item === curr) {
        childExists = this.childExistsHelper(currentArr[0], childrenArr);
      } else {
        childExists = this.childExistsHelper(currentArr[0], acc) || this.childExistsHelper(currentArr[0], childrenArr);
      }
  
      if (childExists) {
        const currentArrCopy = currentArr.slice().splice(1);
        childExists.children.push(
          ...this.directoryDepthHelper(childExists.children, curr, currentArrCopy)
        );
      } else {
        const newChild = {
          name: curr,
          children: []
        };
        acc.push(newChild);
      }
  
      return acc;
    }, []);
  }
  
  childExistsHelper(element, array) {
    let child = false;
  
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === element) {
        child = array[i];
        return child;
      }
    }
  
    return child;
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
      if (el.children !== undefined) {
        return <Node key={i} folder={el} children={this.createChildNodes(el.children)} />
      } else {
        return <Node key={i} folder={el} />
      }
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
    console.log(this.state.directory);
    //* recursion most likely needed to create lower subfolders. Works only for first level.
    const nodes = this.createNodes(this.state.directory);

    return (
      [nodes]
    );
  }
}

export default Tree;
