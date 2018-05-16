import React, { Component } from 'react';
import '../styles/error.css';

const ResultError = ({ history, result, loadNext }) => {
	return (
		<div className="error-container">
			<h2>
				<i onClick={this.goBack} className="fas fa-angle-left" />How About{' '}
				<span className="term">{result.toUpperCase()}?</span>
				<i onClick={loadNext} className="fas fa-angle-right" />
			</h2>
			<div className="error-result">
				<h4 className="error-message">BUMMER!!</h4>
				<h4 className="sub-error">
					{' '}
					Looks like we couldn't find anything for {result}
				</h4>
				<ul className="options">
					<a href="/">
						<li>GO HOME</li>
					</a>
					<a href="/preferences">
						<li>Edit Preferences</li>
					</a>
					<li onClick={loadNext}>NEXT SEARCH</li>
				</ul>
			</div>
		</div>
	);
};

export default ResultError;
