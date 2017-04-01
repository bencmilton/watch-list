import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { formatJsDate } from '../../helpers';
import './style.css';

const NUM_OF_SEASONS = 10;
const NUM_OF_EPISODES = 24;

class AddTitleModal extends Component {

	constructor(props) {
		super(props);
		const initialData = props.lastEpisodeWatched || props.currentTitle;
		this.state = {
			date: formatJsDate(new Date()),
			title: initialData ? initialData.title : '',
			season: initialData ? initialData.season : '--',
			episode: initialData ? initialData.episode + 1 : '--',
			source: initialData ? initialData.source : 'Benplex',
			type: initialData ? initialData.type : 'TV',
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleTypeChange = event => {
		const { value } = event.target;
		const initialData = this.props.lastEpisodeWatched || this.props.currentTitle || {};
		const isMovie = value === 'Movie';
		const episode = isMovie ? '--' : initialData.episode + 1;
		const season = isMovie ? '--' : initialData.season;
		this.setState({
			type: value,
			episode: episode || 1,
			season: season || 1
		})
	}

	renderSelectOptions(items, type) {
		const capType = _.capitalize(type);
		return _.map(items, item =>
			<option key={item} value={item}>{item}</option>
		).concat(
			<option key={items.length + 1} value={`new${capType}`}>New {capType}</option>
		);
	}

	submitForm = event => {
		event.preventDefault();
		const newTitle = this.state;
		newTitle._id = `${this.state.title} (S${this.state.season} E${this.state.episode})`;
		if (newTitle.type === 'Movie') {
			newTitle.season = '--';
			newTitle.episode = '--';
		} else {
			newTitle.season = _.toNumber(newTitle.season);
			newTitle.episode = _.toNumber(newTitle.episode);
		}

		this.props.addTitle(newTitle);
	}

	render() {
		const {
			date,
			episode,
			season,
			source,
			title,
			type
		} = this.state;

		const {
			movies,
			sources,
			tvShows
		} = this.props.data;

		const titleType = type === 'TV' ? _.uniqBy(tvShows, 'title') : movies;
		const titles = _.map(titleType, item => item.title);

		return (
			<form onSubmit={this.submitForm} className="add-title--container">
				<label className="add-title--input">
					<p>Date</p>
					<input className="add-title--input" name="date" onChange={this.handleChange} value={date} />
				</label>
				<label>
					<p>Type</p>
					<select className="add-title--input" name="type" onChange={this.handleTypeChange} value={type}>
						<option value="TV">TV</option>
						<option value="Movie">Movie</option>
					</select>
				</label>
				<label>
					<p>Title</p>
					<select className="add-title--input" name="title" onChange={this.handleChange} value={title}>
						{this.renderSelectOptions(titles, 'title')}
					</select>
					{title === 'newTitle' &&
					<p>
						{'Add New Title: '}
						<input className="add-title--input" name="title" onChange={this.handleChange} value={title} />
					</p>
					}
				</label>
				{type === 'TV' &&
					<label>
						<p>Season</p>
						<select className="add-title--input" name="season" onChange={this.handleChange} value={season}>
							{_.range(1, NUM_OF_SEASONS + 1).map(num =>
								<option key={num} value={num}>{num}</option>
							)}
						</select>
					</label>
				}
				{type === 'TV' &&
					<label>
						<p>Episode</p>
						<select className="add-title--input" name="episode" onChange={this.handleChange} value={episode}>
							{_.range(1, NUM_OF_EPISODES + 1).map(num =>
								<option key={num} value={num}>{num}</option>
							)}
						</select>
					</label>
				}
				<label>
					<p>Source</p>
					<select className="add-title--input" name="source" onChange={this.handleChange} value={source}>
						{this.renderSelectOptions(sources, 'source')}
					</select>
					{source === 'newSource' &&
						<p>
							{'Add New Source: '}
							<input className="add-title--input" name="source" onChange={this.handleChange} value={source} />
						</p>
					}
				</label>
				<p>
					<button type="Submit">Submit</button>
				</p>
			</form>
		);
	}
}

AddTitleModal.propTypes = {
	addTitle: PropTypes.func,
	currentTitle: PropTypes.shape({
		episode: PropTypes.number,
		season: PropTypes.number,
		source: PropTypes.string,
		title: PropTypes.string,
		type: PropTypes.string
	}),
	data: PropTypes.shape({
		allData: PropTypes.arrayOf(PropTypes.object),
		sources: PropTypes.arrayOf(PropTypes.string),
		titles: PropTypes.arrayOf(PropTypes.string)
	}),
	lastEpisodeWatched: PropTypes.shape({
		episode: PropTypes.number,
		season: PropTypes.number,
		source: PropTypes.string,
		title: PropTypes.string,
		type: PropTypes.string
	})
};

function mapStateToProps(state) {
	return {
		data: state.data
	};
}

export default connect(mapStateToProps)(AddTitleModal);
