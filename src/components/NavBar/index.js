import React, { Component } from 'react';

import NavbarLink from '../Common/NavbarLink';
import './style.css';

export default class NavBar extends Component {
	render() {
		return (
			<div className="navbar-container">
				<div className="navbar-container center">
					<NavbarLink to="/" exact activeClassName="navbar-button--active">
						Watch List
					</NavbarLink>
				</div>
				<div className="navbar-container right">
					<NavbarLink to="/add-title" exact activeClassName="navbar-button--active">
						Add Title
					</NavbarLink>
					<NavbarLink to="/movie-list" exact activeClassName="navbar-button--active">
						Movies
					</NavbarLink>
				</div>
			</div>
		)
	}
}
