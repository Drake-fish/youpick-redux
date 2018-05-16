import React, { Component } from 'react';
import '../styles/loader.css';

const PlayLoader = props => {
	return (
		<div className="loader">
			<h3>{props.message}</h3>
		</div>
	);
};

export default PlayLoader;
