import React, { Component } from 'react';
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
		const { data } = this.props;

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
			<StatTable data={movies} />
			<TitleTable data={movies} />
		</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		data: state.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
