import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddButton from '../AddButton';
import AddTitleModal from '../AddTitleModal';
import PageContainer from '../PageContainer';
import MainTable from '../MainTable';
import * as dataActions from '../../actions/data-actions';
import './style.css';

class MainList extends Component {

	constructor(props) {
		super(props);
		this.state = {
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

  render() {
    return (
			<PageContainer>
				{!this.state.modalOpen &&
					<MainTable data={this.props.data.allData} />
				}
				{this.state.modalOpen &&
					<AddTitleModal addTitle={this.addTitle} />
				}
				<AddButton onClick={this.toggleModal} />
			</PageContainer>
    );
  }
}

MainList.propTypes = {
	actions: PropTypes.shape({
		addTitle: PropTypes.func
	}),
	data: PropTypes.shape({
		allData: PropTypes.arrayOf(PropTypes.object)
	})
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

export default connect(mapStateToProps, mapDispatchToProps)(MainList);
