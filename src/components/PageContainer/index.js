import React, { Component } from 'react';
// import { connect } from 'react-redux';

import './style.css';

class PageContainer extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="body-container">
				<div className="table-container">
					<div className="table-card">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default PageContainer;
