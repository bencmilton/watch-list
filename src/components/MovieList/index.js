import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddButton from '../AddButton';
import AddTitleModal from '../AddTitleModal';
import PageContainer from '../PageContainer';
import TableCardTabs from '../TableCardTabs';
import TitleGrid from '../TitleGrid';
import TitleTable from '../TitleTable';
import StatTable from '../StatTable';
import * as dataActions from '../../actions/data-actions';

class MovieList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentTab: 'grid',
			modalOpen: false
		}
	}

	addTitle = data => {
		this.props.actions.addTitle(data);
		this.setState({
			modalOpen: false
		})
	}

	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	setCurrentTab = currentTab => {
		this.setState({ currentTab });
	}

	render() {
		const { currentTab, modalOpen } = this.state;
		const { data, global } = this.props;
		if (!data.movies.length) {
			return (
				<p>Loading...</p>
			);
		}

		const tabbedContent = currentTab === 'grid'
			? <TitleGrid data={data.movies} />
			: <TitleTable data={data.movies} />;

		const initialData = {
			type: 'Movie',
			source: 'Benplex'
		};

		return (
			<PageContainer>
				<StatTable showStats={global.showStats} data={data.movies} />
				<TableCardTabs setCurrentTab={this.setCurrentTab} currentTab={currentTab} />
				{!modalOpen && tabbedContent}
				{modalOpen &&
					<AddTitleModal addTitle={this.addTitle} currentTitle={initialData} />
				}
				<AddButton onClick={this.toggleModal} />
			</PageContainer>
		);
	}
}

MovieList.propTypes = {
	actions: PropTypes.shape({
		addTitle: PropTypes.func
	}),
	data: PropTypes.shape({
		movies: PropTypes.arrayOf(PropTypes.object)
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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
