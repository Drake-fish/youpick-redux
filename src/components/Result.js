import React, { Component } from 'react';

export default class Result extends Component{
  constructor(props){
    super(props);
    this.state = {
      mapOpen:false,
      contactOpen:false
    }

  }
  toggleMap = () => {
    this.setState({
      mapOpen:!this.state.mapOpen,
      contactOpen:false,
    })
  }
  toggleContact = () => {
    this.setState({
      mapOpen:false,
      contactOpen:!this.state.contactOpen
    });
  }
  render(){
  const { details, result, loadNext, location } = this.props;
  const url = `https://www.google.com/maps/embed/v1/directions?origin=${location.latitude}%2C${location.longitude}&destination=${details.location.address}&key=AIzaSyDi7Dus0sr6U1ZjH_ixNtWF8fV2reeFDn0`
  let results;
  let footer;
    console.log('no description',details.tips.groups[0].items[0].text);
  let description=(
      <div className="user-container">
        <div className="user-image-container">
          <img className="user-image" src={`${details.tips.groups[0].items[0].user.photo.prefix}original${details.tips.groups[0].items[0].user.photo.suffix}`}/>
        </div>
        <div className="tip-container">
          <p>{details.tips.groups[0].items[0].text}</p>
        </div>
      </div>
    )

  if(details.menu){
    footer = (
      <ul className="footer">
        <li><a href={details.menu.url}><i className="far fa-file-alt"></i><h5>MENU</h5></a></li>
        <li onClick={this.toggleMap}><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li onClick={this.toggleContact}><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li><i className="far fa-thumbs-up"></i><h5>{details.likes.count} LIKES</h5></li>
      </ul>
    );

  }else{
    footer=(
      <ul className="footer">
        <li onClick={this.toggleMap} className='footer-3'><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
        <li onClick={this.toggleContact} className='footer-3'><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
        <li className='footer-3'><i className="far fa-thumbs-up"></i><h5>{details.likes.count} LIKES</h5></li>
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
          <div className="map-container">
          </div>
          <div className="contact">
          </div>
          <div className="description">
            {description}
          </div>
          {footer}
        </div>
      </div>
  );
  if(this.state.mapOpen){
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
          <div className="map-container map-open">
            <iframe className="map" src={url}></iframe>
          </div>
          <div className="contact">
          </div>
          <div className="description description-hidden">
            {description}
          </div>
          {footer}
        </div>
      </div>
    )
  }else if(this.state.contactOpen){
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
          <div className="map-container">
            <iframe className="map" src={url}></iframe>
          </div>
          <div className="contact contact-open">
            <h4>{details.hours.status}</h4>
            <div className="hours">
            <h4>Hours of Operation</h4>
            {details.hours.timeframes.map((hour) => {
              return (<h5>{hour.days} {hour.open[0].renderedTime}</h5>);
            })}
            </div>
            <h4>Phone {details.contact.formattedPhone}</h4>

          </div>
          <div className="description description-hidden">
            {description}
          </div>
          {footer}
        </div>
      </div>
    );
  }
      return(
      <div>
        {results}
      </div>
    );
  }
}
