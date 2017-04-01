import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AddButton from '../AddButton';
import PageContainer from '../PageContainer';
import TableCardTabs from '../TableCardTabs';
import TitleGrid from '../TitleGrid';
import TitleTable from '../TitleTable';
import StatTable from '../StatTable';

class MovieList extends Component {

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
		if (!data.movies.length) {
			return (
				<p>Loading...</p>
			);
		}

		return (
			<PageContainer>
				<StatTable showStats={global.showStats} data={data.movies} />
				<TableCardTabs setCurrentTab={this.setCurrentTab} currentTab={currentTab} />
				{currentTab === 'grid'
					? <TitleGrid data={data.movies} />
					: <TitleTable data={data.movies} />
				}
				<AddButton />
			</PageContainer>
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
