import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddButton from '../AddButton';
import AddTitleModal from '../AddTitleModal';
import PageContainer from '../PageContainer';
import TitleDetails from '../TitleDetails';
import * as dataActions from '../../actions/data-actions';
import './style.css';

class DetailPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		}
	}

	addEpisode = data => {
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

	componentDidMount() {
		if (!this.props.data.allData.length) {
			this.props.actions.getAllData();
		} else {
			this.props.actions.getDetailData(this.props.match.params.id);
		}
	}

	componentWillReceiveProps(newProps) {
		const { allData, detailPage } = this.props.data;
		const allDataChanged = allData !== newProps.data.allData;
		if ( _.isEmpty(detailPage) && allDataChanged) {
			this.props.actions.getDetailData(this.props.match.params.id);
		}
	}

	render() {
		const { allData, detailPage } = this.props.data;
		if (!detailPage) {
			return (
				<p>Loading...</p>
			)
		}

		const watchedEpisodes = _(allData).filter({ title: detailPage.title }).sortBy('episode').value();

		return (
			<PageContainer>
				{!this.state.modalOpen &&
					<TitleDetails title={detailPage} watchedEpisodes={watchedEpisodes} />
				}
				{this.state.modalOpen &&
					<AddTitleModal
						addTitle={this.addEpisode}
						currentTitle={detailPage}
						lastEpisodeWatched={watchedEpisodes[watchedEpisodes.length - 1]}
					/>
				}
				<AddButton onClick={this.toggleModal} />
			</PageContainer>
		);
	}
}

DetailPage.propTyoes = {
	data: {
		detailPage: PropTypes.shape({
			title: PropTypes.string
		}),
		allData: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string
		})),
		action: PropTypes.shape({
			addTitle: PropTypes.func,
			getAllData: PropTypes.func,
			getDetailData: PropTypes.func
		}),
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string
			})
		})
	}
};

function mapStateToProps(state) {
	return {
		data: state.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
