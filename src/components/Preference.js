import React, { Component } from 'react';
import '../styles/preferences.css';
import { editPreference } from '../actions/preferenceActions';

class Preference extends Component {
  constructor(props){
    super(props);
    this.state = { isChecked: this.props.status}
  }
  handleChange = () => {
    this.setState({isChecked: !this.state.isChecked});
    const { pref, user, editPreference, id, section } = this.props;
    editPreference(user, {[pref]:!this.state.isChecked}, id, section);

  }
  render() {
    const { pref } = this.props;
    return (
      <div className="liked-item">
        <h4>{pref}</h4>
        <label className="switch">
        <input checked={this.state.isChecked} onChange={this.handleChange}
        type="checkbox"/>
        <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

export default Preference;
