import React, { Component } from 'react';
import '../styles/result.css';

const Footer = props => {
	const {
		details,
		toggleMap,
		toggleContact,
		mapOpen,
		contactOpen,
		toggleInfo
	} = props;
	return (
		<ul className="footer">
			<li
				onClick={toggleInfo}
				className={
					mapOpen || contactOpen ? 'footer-3' : 'footer-3 footer-likes-open'
				}>
				<i className="fas fa-info" />
			</li>
			<li
				className={mapOpen ? 'footer-3 footer-map-open' : 'footer-3'}
				onClick={toggleMap}>
				<i className="fas fa-map-marker-alt" />
			</li>
			<li
				className={contactOpen ? 'footer-3 footer-contact-open' : 'footer-3'}
				onClick={toggleContact}>
				<i className="fas fa-mobile-alt" />
			</li>
		</ul>
	);
};

export default Footer;
