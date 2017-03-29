import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TitleTable from '../TitleTable';
import StatTable from '../StatTable';
import * as dataActions from '../../actions/data-actions';

class MovieList extends Component {

	componentDidMount() {
		this.props.actions.getAllData();
	}

	render() {
		const { data, global } = this.props;
		if (!data.length) {
			return (
				<p>Loading...</p>
			);
		}

		const movies = data.map(item => ({
			...item.doc,
			...item
		}))
			.filter(item => item.type === 'Movie');

		return (
		<div>
			{global.showStats &&
				<StatTable data={movies} />
			}
			<TitleTable data={movies} />
		</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		data: state.data,
		global: state.global
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataActions, dispatch)
	}
}

MovieList.propTypes = {
	actions: PropTypes.shape({
		getAllData: PropTypes.func
	}),
	data: PropTypes.arrayOf(PropTypes.shape({
		doc: PropTypes.object,
		type: PropTypes.string
	})),
	global: PropTypes.shape({
		showStats: PropTypes.bool
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
