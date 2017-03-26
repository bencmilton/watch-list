import React, { Component } from 'react';

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
			<div className="App">
				<p className="App-intro">
					Click to add: <code>{this.state.value}</code>
				</p>
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}
