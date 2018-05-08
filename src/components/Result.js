import React, { Component } from 'react';

import ResultFooter from './ResultFooter';
import { key } from '../config';
export default class Result extends Component{
  constructor(props){
    super(props);
  }

  render(){
  const { details, result, loadNext, location, mapOpen, contactOpen, toggleMap, toggleContact, toggleLikes } = this.props;
  const url = `https://www.google.com/maps/embed/v1/directions?origin=${location.latitude}%2C${location.longitude}&destination=${details.location.address}&key=${key}`
      return(
      <div>
        <h2>How About {result}</h2>
        <p onClick={loadNext} className="next">NOPE</p>
        <div className="details-container">
          <a href={details.canonicalUrl} target="_blank"><h3 className="venue-title">{details.name} <i className="fas fa-angle-right"></i></h3></a>
          <div className="photo-container">
            {details.photos.groups[0] && details.photos.groups[0].items.map((photo,i) => {
              return (<img key={i} className={`photo-${i}`} src={`${photo.prefix}original${photo.suffix}`}/>);
            })
          }
          </div>
          {
            //if the map should be open show it, if not show nothing.
            mapOpen ? (
            <div className="map-container map-open">
              <iframe className="map" src={url}></iframe>
            </div>
            ) : <div className="map-container"></div>
          }
          {
            //if the contact is open show the contact information if not show nothing.
            contactOpen ? (
              <div className="contact contact-open">
              {details.hours !== undefined && <h4>{details.hours.status}</h4>}
                <div className="hours">
                <h4>Hours of Operation</h4>
                {details.hours !== undefined && details.hours.timeframes.map((hour) => {
                  return (<h5>{hour.days} {hour.open[0].renderedTime}</h5>);
                })}
                </div>
                <h4>Phone {details.contact.formattedPhone}</h4>

              </div>
            ) : <div className="contact"></div>
          }

              <div className="comments-container">
                {details.tips.groups && details.tips.groups[0].items.map((tip,i) => {
                return (
                <div key={i} className={mapOpen || contactOpen ? "description description-hidden" : "description"}>
                  <div className={`user-container${i}`}>
                    <div className="user-image-container">
                      <img className="user-image" src={`${tip.user.photo.prefix}original${tip.user.photo.suffix}`}/>
                    </div>
                    <div className="tip-container">
                      <p>{tip.text}</p>
                    </div>
                    </div>
                </div>
                );
              })}
          </div>
          <ResultFooter mapOpen={mapOpen} contactOpen={contactOpen} details={details} toggleMap={toggleMap} toggleContact={toggleContact} toggleLikes={toggleLikes}/>
        </div>
      </div>
    );
  }
}
