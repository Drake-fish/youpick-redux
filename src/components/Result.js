import React, { Component } from 'react';

import ResultFooter from './ResultFooter';
import { key } from '../config';
import InformationComponent from './InformationComponent';

export default class Result extends Component{
  constructor(props){
    super(props);
  }
  goBack = () => {
    this.props.history.push('/');
  }
  render(){
  console.log("THIS PROPS AT RESULT", this.props);
  const { details, infoOpen, result, loadNext, location, mapOpen, contactOpen, toggleMap, toggleContact, toggleInfo } = this.props;
  let menu;
  details.menu ? menu=details.menu.url : menu=null;
  const url = `https://www.google.com/maps/embed/v1/directions?origin=${location.latitude}%2C${location.longitude}&destination=${details.location.address}&key=${key}`
      return(
      <div>
        <h2><i onClick={this.goBack} className="fas fa-angle-left"></i>How About <span className="term">{result.toUpperCase()}?</span><i onClick={loadNext} className="fas fa-angle-right"></i></h2>
        <div className="details-container">
          <div className="result-photo-container">
            <img className="result-photo" src={`${details.photos.groups[0].items[0].prefix}original${details.photos.groups[0].items[0].suffix}`}/>
          </div>
          <InformationComponent infoOpen={infoOpen} title={details.name} tip={details.tips ? details.tips.groups[0].items[0].text : null} user={details.tips ? `${details.tips.groups[0].items[0].user.photo.prefix}original${details.tips.groups[0].items[0].user.photo.suffix}` : null } type={details.categories ? details.categories[0].shortName : null} cost={details.price ? details.price.tier : null} rating={details.rating} ratingColor={details.ratingColor} message={details.price ? details.price.message : null} menu={menu}/>
                <div className={mapOpen ? "map-container map-open" : "map-container"}>
                  <iframe className="map" src={url}></iframe>
                  <h5 className="address">{details.location.address}</h5>
                  <h5 className="cross-street">{details.location.crossStreet}</h5>
                </div>
                <div className={contactOpen ? "contact contact-open" : "contact"}>
                 {details.hours !== undefined && <h4>{details.hours.status}</h4>}
                   <div className="hours">
                   <h4>Hours of Operation</h4>
                   {details.hours !== undefined && details.hours.timeframes.map((hour) => {
                     return (<h5>{hour.days} {hour.open[0].renderedTime}</h5>);
                   })}
                   </div>
                   <h4>Phone {details.contact.formattedPhone}</h4>
                </div>
          <ResultFooter mapOpen={mapOpen} contactOpen={contactOpen} details={details} toggleMap={toggleMap} toggleContact={toggleContact} toggleInfo={toggleInfo}/>
        </div>
      </div>
    );
  }
}
