import React, { Component } from 'react';

export default class Result extends Component{
  constructor(props){
    super(props);

  }
  render(){
    const { details, result, loadNext } = this.props;
  let results;
  let footer;
  if(details.menu){
    footer = (
      <ul className="footer">
        <li><a href={details.menu.url}><i className="far fa-file-alt"></i><h5>MENU</h5></a></li>
        <li><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li><i className="far fa-thumbs-up"></i><h5>LIKES</h5></li>
      </ul>
    );

  }else{
    footer=(
      <ul className="footer">
        <li className='footer-3'><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li className='footer-3'><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li className='footer-3'><i className="far fa-thumbs-up"></i><h5>LIKES</h5></li>
      </ul>
    );
  }
  results=(
      <div>
        <h2>How About {result}</h2>
        <p onClick={loadNext} className="next">NOPE</p>
        <div className="details-container">
          <a href={details.canonicalUrl} target="_blank"><h3 className="venue-title">{details.name} <i className="fas fa-angle-right"></i></h3></a>
          <div className="photo-container">
            <img className="photo-1" src={`${details.photos.groups[0].items[0].prefix}original${details.photos.groups[0].items[0].suffix}`}/>
            <img src={`${details.photos.groups[0].items[1].prefix}original${details.photos.groups[0].items[1].suffix}`}/>
          </div>
          <p className="description">{details.description}</p>
          {footer}
        </div>
      </div>
  );
      return(
      <div>
        {results}
      </div>
    );
  }
}
