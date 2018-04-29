import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/result.css';
import { clearResults } from '../actions/dineActions';

class Result extends Component {
  componentWillMount(){
    if(!this.props.result){
      this.props.history.push('/');
    }
  }
  render() {


    console.log("RESULTS", this.props.result, "DETAILS", this.props.details);
    const { result, details } = this.props;
    let menu;
    if(details.menu){
      menu = (
        <li><a href={details.menu.url}><i className="far fa-file-alt"></i><h5>MENU</h5></a></li>
      );
    }
    return (
      <div className="result">
        <h2>How About {result}</h2>
        <div className="details-container">
          <h3 className="venue-title">{details.name} <i className="fas fa-angle-right"></i></h3>
          <div className="photo-container">
            <img className="photo-1" src={`${details.photos.groups[0].items[0].prefix}original${details.photos.groups[0].items[0].suffix}`}/>
            <img src={`${details.photos.groups[0].items[1].prefix}original${details.photos.groups[0].items[1].suffix}`}/>
          </div>
          <p className="description">{details.description}</p>
          <ul className="footer">
            {menu}
            <li><i className="fas fa-map-marker-alt"></i><h5>MAP</h5></li>
            <li><i className="fas fa-mobile-alt"></i><h5>CONTACT</h5></li>
            <li><i className="far fa-thumbs-up"></i><h5>LIKES</h5></li>
          </ul>
        </div>
      </div>
    );
  }
  componentWillUnmount(){
    console.log("UNMOUNTING COMPONETN CLEARING SHIT");
    this.props.clearResults();
  }
}
function mapStateToProps(state, ownProps){
  console.log(state);
  return {
    result:state.dine.query,
    details:state.dine.details
  }
}

export default connect(mapStateToProps, { clearResults })(Result);
