import _ from 'lodash';
import React, { PropTypes } from 'react';

import './style.css';

function TitleDetails({ title, watchedEpisodes }) {
	return (
		<div className="detail-page--container">
			<img
				src={title.poster}
				className="detail-page--poster"
				alt={title.title}
			/>
			<div className="detail-page--info">
				<h1>{title.title} {title.year && `(${title.year})`}</h1>
				<p>Genre: {title.genre}</p>
				<p>Rated: {title.rated}</p>
				<p>Release Date: {title.released}</p>
				<p>IMDb Rating: {title.imdbRating} ({title.imdbVotes} votes)</p>
				<p>Runtime: {title.runtime} minutes</p>
				{title.type === 'TV' &&
				<div>
					<p>Episodes Watched:</p>
					<ul>
						{_.map(watchedEpisodes, item =>
							<li key={item._id}>{item.episode} -- {item.date}</li>
						)}
					</ul>
				</div>
				}
			</div>
		</div>
	)
}

TitleDetails.propTypes ={
	title: PropTypes.shape({
		poster: PropTypes.string,
		title: PropTypes.string,
		year: PropTypes.number,
		genre: PropTypes.string,
		rated: PropTypes.string,
		released: PropTypes.string,
		imdbRating: PropTypes.number,
		imdbVotes: PropTypes.number,
		runtime: PropTypes.number
	}),
	watchedEpisodes: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		episode: PropTypes.number,
		date: PropTypes.string,
	}))
};

export default TitleDetails;
