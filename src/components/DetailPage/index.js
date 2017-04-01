import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageContainer from '../PageContainer';
import { formatDate } from '../../helpers';
import * as dataActions from '../../actions/data-actions';
import './style.css';

class DetailPage extends Component {

	componentDidMount() {
		if (!this.props.data.allData.length) {
			this.props.actions.getAllData();
		} else {
			this.props.actions.getDetailData(this.props.match.params.id);
		}
	}

	componentWillReceiveProps(newProps) {
		const { allData, detailPage } = this.props.data;
		const allDataChanged = allData !== newProps.data.allData;
		if ( _.isEmpty(detailPage) && allDataChanged) {
			this.props.actions.getDetailData(this.props.match.params.id);
		}
	}

	render() {
		const { allData, detailPage } = this.props.data;
		console.log('DetailPage, detailPage --> ', detailPage)
		if (!detailPage) {
			return (
				<p>Loading...</p>
			)
		}

		const watchedEpisodes = _.filter(allData, { title: detailPage.title });

		return (
			<PageContainer>
				<div className="detail-page--container">
					<img
						src={detailPage.poster}
						className="detail-page--poster"
						alt={detailPage.title}
					/>
					<div className="detail-page--info">
						<h1>{detailPage.title} {detailPage.year && `(${detailPage.year})`}</h1>
						<p>Genre: {detailPage.genre}</p>
						<p>Rated: {detailPage.rated}</p>
						<p>Release Date: {detailPage.released}</p>
						<p>IMDb Rating: {detailPage.imdbRating} ({detailPage.imdbVotes} votes)</p>
						<p>Runtime: {detailPage.runtime} minutes</p>
						{detailPage.type === 'TV' &&
							<div>
								<p>Episodes Watched:</p>
								<ul>
								{_.map(watchedEpisodes, item =>
									<li key={item._id}>{item.episode} -- {formatDate(item.date)}</li>
								)}
								</ul>
							</div>
						}
					</div>
				</div>
			</PageContainer>
		);
	}
}

DetailPage.propTyoes = {
	data: {
		detailPage: PropTypes.shape({
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
		allData: PropTypes.array,
		action: PropTypes.shape({
			getAllData: PropTypes.func,
			getDetailData: PropTypes.func
		}),
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string
			})
		})
	}
};

function mapStateToProps(state) {
	return {
		data: state.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);