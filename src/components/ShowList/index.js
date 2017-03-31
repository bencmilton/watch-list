import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TableCardTabs from '../TableCardTabs';
import TitleGrid from '../TitleGrid';
import TitleTable from '../TitleTable';
import StatTable from '../StatTable';

class ShowList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentTab: 'grid'
		}
	}

	setCurrentTab = currentTab => {
		this.setState({ currentTab });
	}

	render() {
		const { currentTab } = this.state;
		const { data, global } = this.props;

		if (!data.tvShows.length) {
			return (
				<p>Loading...</p>
			);
		}

		const uniqueShows = _.uniqBy(data.tvShows, 'title');

		return (
			<div className="body-container">
				<div className="table-container">
					<StatTable showStats={global.showStats} data={data.tvShows} />
					<div className="table-card">
						<TableCardTabs setCurrentTab={this.setCurrentTab} currentTab={currentTab} />
						{currentTab === 'grid'
							? <TitleGrid data={uniqueShows} />
							: <TitleTable data={uniqueShows} />
						}
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
