import _ from 'lodash';
import React, { PropTypes } from 'react';

import './style.css';

function TitleDetails({ addAsFavorite, removeAsFavorite, title, watchedEpisodes }) {
	return (
		<div className="detail-page--container">
			<img
				src={title.poster}
				className="detail-page--poster"
				alt={title.title}
			/>
			<div className="detail-page--info">
				<h1>
					{title.title} {title.year && `(${title.year})`} {title.favorite && ' ⭐'}
				</h1>
				{!title.favorite &&
					<p onClick={addAsFavorite.bind(null, title._id)}>Add as favorite?</p>
				}
				{title.favorite &&
					<p onClick={removeAsFavorite.bind(null, title._id)}>Un-favorite?</p>
				}
				<p>Actors: {title.actors}</p>
				<p>Plot: {title.plot}</p>
				<p>Awards: {title.awards}</p>
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
		_id: PropTypes.string,
		actors: PropTypes.string,
		awards: PropTypes.string,
		favorite: PropTypes.bool,
		plot: PropTypes.string,
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
		episode: PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		date: PropTypes.string,
	}))
};

export default TitleDetails;
