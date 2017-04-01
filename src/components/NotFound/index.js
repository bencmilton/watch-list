import React, { Component } from 'react';

import PageContainer from '../PageContainer';

export default class NotFound extends Component {
	render() {
		return (
			<PageContainer>
				<h1>
					404 <small>Not Found :(</small>
				</h1>
			</PageContainer>
		);
	}
}