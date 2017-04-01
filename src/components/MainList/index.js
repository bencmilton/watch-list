import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PageContainer from '../PageContainer';
import MainTable from '../MainTable';
import './style.css';

class MainList extends Component {

  render() {
    return (
			<PageContainer>
				<MainTable data={this.props.data.allData} />
			</PageContainer>
    );
  }
}

MainList.propTypes = {
	data: PropTypes.shape({
		allData: PropTypes.arrayOf(PropTypes.object)
	})
};

function mapStateToProps(state) {
	return {
		data: state.data
	};
}

export default connect(mapStateToProps)(MainList);
