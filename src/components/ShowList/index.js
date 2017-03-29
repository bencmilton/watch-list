import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatTable from '../StatTable';
import TitleTable from '../TitleTable';
import * as dataActions from '../../actions/data-actions';

class ShowList extends Component {

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

		const tvShows = data.map(item => ({
			...item.doc,
			...item
		}))
			.filter(item => item.type === 'TV');

		return (
			<div>
				{global.showStats &&
					<StatTable data={tvShows} />
				}
				<TitleTable data={_.uniqBy(tvShows, 'title')} />
			</div>
		);
	}
}

ShowList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
