import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
			<div className="body-container">
				<div className="table-container">
					<StatTable showStats={global.showStats} data={data.movies} />
					<div className="table-card">
						<TableCardTabs setCurrentTab={this.setCurrentTab} currentTab={currentTab} />
						{currentTab === 'grid'
							? <TitleGrid data={data.movies} />
							: <TitleTable data={data.movies} />
						}
					</div>
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
