import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dataActions from '../../actions/data-actions';
import MainTable from '../MainTable';
import './style.css';

class App extends Component {

	componentDidMount() {
		this.props.actions.getAllData();
	}

  render() {
    return (
			<div>
				<MainTable rows={this.props.data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
