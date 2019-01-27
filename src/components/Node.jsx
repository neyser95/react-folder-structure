import React from 'react';

const Node = (props) => {

  function handleFolderExpand(e){
    const parent = e.target.parentNode.parentNode;
    const children = parent.childNodes[1];
    
    if(children.classList.contains('child-nodes--hidden')){
      children.classList.add('child-nodes');
      children.classList.remove('child-nodes--hidden');
    }else{ 
      children.classList.remove('child-nodes');
      children.classList.add('child-nodes--hidden');
    }
  }

  return (
    <div>
      <div className='node'>
        <i className="fas fa-plus" onClick={(e) => {handleFolderExpand(e)}}></i> <i className="fas fa-folder"></i> {props.folder.name}
      </div>
      {props.children ? 
      <div className='child-nodes--hidden'>
        {props.children}
      </div>: null}
    </div>
  )
}

export default Node;