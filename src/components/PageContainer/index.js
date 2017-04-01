import React, { Component } from 'react';

import './style.css';

class PageContainer extends Component {

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
