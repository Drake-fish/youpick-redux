import React, { Component } from 'react';
import '../styles/preferences.css';
import { editPreference } from '../actions/preferenceActions';

class Preference extends Component {
  constructor(props){
    super(props);
    this.state = { isChecked: this.props.status}
  }
  handleChange = () => {
    console.log("CHANGING STATUS");
    this.setState({isChecked: !this.state.isChecked});
    const { pref, status } = this.props;
    this.props.editPreference(this.props.user, {[this.props.pref]:!this.state.isChecked}, this.props.id, this.props.section);

  }
  render() {
    console.log(this.props);
    return (
      <div className="liked-item">
        <h4>{this.props.pref}</h4>
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
