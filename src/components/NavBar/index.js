import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavbarLink from '../Common/NavbarLink';
import Link from '../Common/Link';
import * as globalActions from '../../actions/global-actions';
import './style.css';

class NavBar extends Component {
	render() {
		return (
			<div className="navbar-container">
				<div className="navbar-container center">
					<NavbarLink to="/" exact activeClassName="navbar-button--active">
						Watch List
					</NavbarLink>
				</div>
				<div className="navbar-container right">
					<Link onClick={() => this.props.actions.toggleStats()}>Stats</Link>
					<NavbarLink to="/add-title" exact activeClassName="navbar-button--active">
						Add Title
					</NavbarLink>
					<NavbarLink to="/tv-list" exact activeClassName="navbar-button--active">
						TV Shows
					</NavbarLink>
					<NavbarLink to="/movie-list" exact activeClassName="navbar-button--active">
						Movies
					</NavbarLink>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		global: state.global
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(globalActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
