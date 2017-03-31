import React, { Component } from 'react';
import './style.css';

class TitleGrid extends Component {

	render() {
		const { data } = this.props;
		return (
			<div className="title-grid--container">
				{data.map(item =>
					<div className="title-grid--item">
						<img className="title-grid--poster" src={item.poster} />
					</div>
				)}
			</div>
		);
	}
}

export default TitleGrid;
