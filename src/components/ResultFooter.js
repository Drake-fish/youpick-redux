import React, { Component } from 'react';
import '../styles/result.css';

const Footer= (props) => {
  const { details, toggleMap, toggleContact, mapOpen, contactOpen, toggleLikes } = props;
  if(details.menu){
    return (
      <ul className="footer">
        <li className="footer-4"><a href={details.menu.url} target="_blank"><i className="far fa-file-alt"></i><h5>MENU</h5></a></li>
        <li className={mapOpen ? 'footer-4 footer-map-open' : 'footer-4'} onClick={toggleMap}><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li className={contactOpen ? 'footer-4 footer-contact-open' : 'footer-4'} onClick={toggleContact}><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li onClick={toggleLikes} className={mapOpen || contactOpen ? 'footer-4' : 'footer-4 footer-likes-open'}><i className="far fa-thumbs-up"></i><h5>{details.likes.count} LIKES</h5></li>
      </ul>
    );

  }else{
    return (
      <ul className="footer">
        <li className={mapOpen ? 'footer-3 footer-map-open' : 'footer-3'} onClick={toggleMap}><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li className={contactOpen ? 'footer-3 footer-contact-open' : 'footer-3'} onClick={toggleContact}><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li onClick={toggleLikes}  className={mapOpen || contactOpen ? 'footer-3' : 'footer-3 footer-likes-open'}><i className="far fa-thumbs-up"></i><h5>{details.likes.count} LIKES</h5></li>
      </ul>
    );
  }
}

export default Footer;
