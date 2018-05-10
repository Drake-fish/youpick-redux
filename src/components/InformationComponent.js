import React, { Component } from 'react';
import '../styles/result.css'

const InformationComponent= (props) => {
  let cost='';
  let menu;
  for(var i=0; i<props.cost; i++){
    cost += '$';
  }
  let style={
    background:'#'+props.ratingColor
  }
  props.menu ? menu=<a href={props.menu}>Menu</a> : null;
  console.log("COST",cost);
  return(
    <div className={props.infoOpen ? "result-information-container information-open" : "result-information-container"}>
      <h5 className="result-title">{props.title}</h5>
      <h6 className="result-type">{props.type}</h6>
      <span className="cost">{cost} - {props.message}</span>
      <div className="rating-container">
        <div style={style} className="result-rating-container">
          <span className="rating">{props.rating} out of 10</span>
        </div>
        {menu}
      </div>
      <div className="tip-container">
        <img className="user" src={props.user}/><p className="tip">{props.tip}</p>
      </div>
    </div>
  );
}

export default InformationComponent;
