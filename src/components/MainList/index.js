import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MainTable from '../MainTable';
import './style.css';

class MainList extends Component {

  render() {
    return (
			<div>
				<MainTable data={this.props.data.allData} />
			</div>
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
