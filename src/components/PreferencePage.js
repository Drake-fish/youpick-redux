import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPreferences, savePreference, editPreference } from '../actions/preferenceActions';
import { getUser } from '../actions/userActions';
import _ from 'lodash';
import Preference from './Preference';

class PreferencePage extends Component {
  componentWillMount(){
    if(this.props.preferences === null){
      this.props.history.push('/');
    }
  }
  render() {
    let foodPrefs;
    let playPrefs;
      const { preferences } = this.props;
      console.log(preferences);
      if(preferences !== null){
        foodPrefs=_.map(preferences.food, (food,id)=>{
          let key=id;
          return _.map(food, (status,pref)=>{
            console.log(pref,status, key);
            return <Preference key={id} editPreference={this.props.editPreference} section={"food"} user={this.props.user.uid} pref={pref} id={key} status={status}/>
          })
        });
    //populate the play preferences
        playPrefs=_.map(preferences.play, (play,id)=>{
          let key=id;
          return _.map(play, (status,pref)=>{
            console.log(pref,status, key);
            return <Preference key={id} editPreference={this.props.editPreference} section={"play"} user={this.props.user.uid} pref={pref} id={key} status={status}/>
          })
        });
      }
//populate the food preferences


    return (
      <div>
        <div className="food-preferences">
          <h2>DINING PREFERENCES</h2>
          {foodPrefs}
        </div>
        <div className="play-preferences">
          <h2>PLAY PREFERENCES</h2>
          {playPrefs}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    preferences: state.preferences,
    user:state.user

  }
}

export default connect(mapStateToProps, { getUser, getPreferences, savePreference, editPreference })(PreferencePage);
