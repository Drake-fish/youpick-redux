import React, { Component } from 'react';
import '../styles/search-component.css'

const SearchComponent= (props) => {
  console.log(props);
  return(
    <div onClick={props.click} className="search-component">
      <img className="search-image" src={props.image}/>
      <span className="search-component-title">{props.title}</span>
    </div>
  )
}

export default SearchComponent;
