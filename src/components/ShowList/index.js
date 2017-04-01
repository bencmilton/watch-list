import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PageContainer from '../PageContainer';
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
			<PageContainer>
				<StatTable showStats={global.showStats} data={data.tvShows} />
				<TableCardTabs setCurrentTab={this.setCurrentTab} currentTab={currentTab} />
				{currentTab === 'grid'
					? <TitleGrid data={uniqueShows} />
					: <TitleTable data={uniqueShows} />
				}
			</PageContainer>
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
