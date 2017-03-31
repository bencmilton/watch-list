import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import StatTable from '../StatTable';
import TitleTable from '../TitleTable';

class ShowList extends Component {

	render() {
		const { data, global } = this.props;

		if (!data.tvShows.length) {
			return (
				<p>Loading...</p>
			);
		}

		return (
			<div className="body-container">
				<div className="table-container">
					<StatTable showStats={global.showStats} data={data.tvShows} />
					<div className="table-card">
						<TitleTable data={_.uniqBy(data.tvShows, 'title')} />
					</div>
				</div>
			</div>
		);
	}
}

ShowList.propTypes = {
	data: PropTypes.shape({
		tvShows: PropTypes.arrayOf(PropTypes.object)
	}),
	global: PropTypes.shape({
		showStats: PropTypes.bool
	})
};

function mapStateToProps(state) {
	return {
		data: state.data,
		global: state.global
	};
}

export default connect(mapStateToProps)(ShowList);
