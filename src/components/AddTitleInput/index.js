import React, { Component } from 'react';

import PageContainer from '../PageContainer';

export default class AddTitleInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	handleChange = event => {
		this.setState({
			value: event.target.value
		});
	}

	render() {
		return (
			<PageContainer>
				<p>Click to add: <code>{this.state.value}</code></p>
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</PageContainer>
		);
	}
}
