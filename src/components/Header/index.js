import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavbarLink from '../Common/NavbarLink';
import Link from '../Common/Link';
import * as globalActions from '../../actions/global-actions';
import * as dataActions from '../../actions/data-actions';
import './style.css';

class Header extends Component {

	componentDidMount() {
		this.props.actions.getAllData();
	}

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

Header.propTypes = {
	actions: PropTypes.shape({
		getAllData: PropTypes.func,
		toggleStats: PropTypes.func
	})
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...globalActions, ...dataActions }, dispatch)
	}
}

export default connect(null, mapDispatchToProps, null, { pure: false })(Header);
