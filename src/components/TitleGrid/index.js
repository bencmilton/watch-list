import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class TitleGrid extends Component {

	render() {
		const { data } = this.props;
		return (
			<div className="title-grid--container">
				{data.map(item =>
					<Link
						key={item.imdbID}
						to={"/title/" + item.imdbID}
						className="title-grid--item"
					>
						<img alt={item.title} className="title-grid--poster" src={item.poster} />
						{item.favorite && <div className="title-grid--favorite">⭐</div>}
					</Link>
				)}
			</div>
		);
	}
}

export default TitleGrid;
