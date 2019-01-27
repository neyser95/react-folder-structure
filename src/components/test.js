const util = require('util');

function createDirectoryObject(array, directory = {}) {
  return array.reduce((acc, curr, index, array) => {
    curr = curr.replace(/\//g, ' ').trim();
    arr = curr.split(' ');
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
          ...directoryDepthHelper(acc[arr[0]].children, arr[i], arrCopy)
        );
      }
    }

    return acc;
  }, {});
}

function directoryDepthHelper(childrenArr, item, currentArr) {
  return currentArr.reduce((acc, curr, index, currentArr) => {
    // console.log(curr, currentArr);
    let childExists = false;

    if (item === curr) {
      childExists = childExistsHelper(currentArr[0], childrenArr);
    } else {
      childExists = childExistsHelper(currentArr[0], acc) || childExistsHelper(currentArr[0], childrenArr);
    }

    if (childExists) {
      const currentArrCopy = currentArr.slice().splice(1);
      childExists.children.push(
        ...directoryDepthHelper(childExists.children, curr, currentArrCopy)
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

function childExistsHelper(element, array) {
  let child = false;

  for (let i = 0; i < array.length; i++) {
    if (array[i].name === element) {
      child = array[i];
      return child;
    }
  }

  return child;
}

// const data = ['/home/john/Music', '/home/john/Videos'];

const data = [
  "/home/john/Music",
  "/home/kyle/Music",
  "/home/kyle/Pictures",
  "/home/kyle/Pictures/2018",
  "/usr",
  "/opt",
  "/etc/fonts",
  "/home/john/Videos",
  "/usr/bin",
  "/opt/usr/bin",
  "/home/kyle/Pictures/2018",
  "/etc/fonts/fonts",
  "/home/john/Videos"
]

// util.inspect(createDirectoryObject(data), false, null, true);

console.log(util.inspect(createDirectoryObject(data), false, null, true));