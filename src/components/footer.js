import React, { Component } from 'react';
import '../styles/result.css';

const Footer= (props) => {
  const { details, toggleMap, toggleContact } = props;
  if(details.menu){
    return (
      <ul className="footer">
        <li><a href={details.menu.url}><i className="far fa-file-alt"></i><h5>MENU</h5></a></li>
        <li onClick={toggleMap}><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li onClick={toggleContact}><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li><i className="far fa-thumbs-up"></i><h5>{details.likes.count} LIKES</h5></li>
      </ul>
    );

  }else{
    return (
      <ul className="footer">
        <li onClick={toggleMap} className='footer-3'><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li onClick={toggleContact} className='footer-3'><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li className='footer-3'><i className="far fa-thumbs-up"></i><h5>{details.likes.count} LIKES</h5></li>
      </ul>
    );
  }
}

export default Footer;
