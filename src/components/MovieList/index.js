import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TitleTable from '../TitleTable';
import StatTable from '../StatTable';

class MovieList extends Component {

	render() {
		const { data, global } = this.props;
		if (!data.movies.length) {
			return (
				<p>Loading...</p>
			);
		}

		return (
			<div className="table-container">
				{global.showStats &&
					<StatTable data={data.movies} />
				}
				<div className="table-card">
					<TitleTable data={data.movies} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.data,
		global: state.global
	};
}

MovieList.propTypes = {
	data: PropTypes.shape({
		movies: PropTypes.arrayOf(PropTypes.object)
	}),
	global: PropTypes.shape({
		showStats: PropTypes.bool
	})
};

export default connect(mapStateToProps)(MovieList);
