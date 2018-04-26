import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPreferences, savePreference, editPreference } from '../actions/preferenceActions';
import { getUser } from '../actions/userActions';
import _ from 'lodash';
import Preference from './Preference';

class PreferencePage extends Component {

  render() {
    // console.log("PROPS AT PREFRERENCE", this.props.preferences.food);
      const { preferences } = this.props;
//populate the food preferences
    let foodPrefs=_.map(preferences.food, (food,id)=>{
      let key=id;
      return _.map(food, (status,pref)=>{
        console.log(pref,status, key);
        return <Preference key={id} editPreference={this.props.editPreference} section={"food"} user={this.props.user.uid} pref={pref} id={key} status={status}/>
      })
    });
//populate the play preferences
    let playPrefs=_.map(preferences.play, (play,id)=>{
      let key=id;
      return _.map(play, (status,pref)=>{
        console.log(pref,status, key);
        return <Preference key={id} editPreference={this.props.editPreference} section={"play"} user={this.props.user.uid} pref={pref} id={key} status={status}/>
      })
    });

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
