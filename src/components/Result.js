import React, { Component } from 'react';

import ResultFooter from './ResultFooter';
import { key } from '../config';
import InformationComponent from './InformationComponent';

export default class Result extends Component {
	constructor(props) {
		super(props);
	}
	goBack = () => {
		this.props.history.push('/');
	};
	render() {
		const {
			details,
			infoOpen,
			result,
			loadNext,
			location,
			mapOpen,
			contactOpen,
			toggleMap,
			toggleContact,
			toggleInfo
		} = this.props;
		let menu = details.menu ? details.menu.url : null;
		let tip =
			details.tips.groups[0].items.length > 0
				? details.tips.groups[0].items[0].text
				: null;
		let user =
			details.tips.groups[0].items.length > 0
				? `${details.tips.groups[0].items[0].user.photo.prefix}original${
						details.tips.groups[0].items[0].user.photo.suffix
				  }`
				: null;
		let type = details.categories ? details.categories[0].shortName : null;
		let cost = details.price ? details.price.tier : null;
		let message = details.price ? details.price.message : null;
		let photo =
			details.photos.groups.length > 0
				? `${details.photos.groups[0].items[0].prefix}original${
						details.photos.groups[0].items[0].suffix
				  }`
				: null;
		let url = `https://www.google.com/maps/embed/v1/directions?origin=${
			location.latitude
		}%2C${location.longitude}&destination=${
			details.location.address
		}&key=${key}`;

		return (
			<div>
				<h2>
					<i onClick={this.goBack} className="fas fa-angle-left" />How About{' '}
					<span className="term">{result.toUpperCase()}?</span>
					<i onClick={loadNext} className="fas fa-angle-right" />
				</h2>
				<div className="details-container">
					<div className="result-photo-container">
						<img className="result-photo" src={photo} />
					</div>
					<InformationComponent
						infoOpen={infoOpen}
						title={details.name}
						tip={tip}
						user={user}
						type={type}
						cost={cost}
						rating={details.rating}
						ratingColor={details.ratingColor}
						message={message}
						menu={menu}
					/>
					<div className={mapOpen ? 'map-container map-open' : 'map-container'}>
						<iframe className="map" src={url} />
						<h5 className="address">{details.location.address}</h5>
						<h5 className="cross-street">{details.location.crossStreet}</h5>
					</div>
					<div className={contactOpen ? 'contact contact-open' : 'contact'}>
						{details.hours !== undefined && <h4>{details.hours.status}</h4>}
						<div className="hours">
							<h4>Hours of Operation</h4>
							{details.hours !== undefined &&
								details.hours.timeframes.map((hour, i) => {
									return (
										<h5 key={i}>
											{hour.days} {hour.open[0].renderedTime}
										</h5>
									);
								})}
						</div>
						<h4>Phone {details.contact.formattedPhone}</h4>
					</div>
					<ResultFooter
						mapOpen={mapOpen}
						contactOpen={contactOpen}
						details={details}
						toggleMap={toggleMap}
						toggleContact={toggleContact}
						toggleInfo={toggleInfo}
					/>
				</div>
			</div>
		);
	}
}
