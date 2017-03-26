import PouchDB from 'pouchdb';
import React, { Component } from 'react';

import logo from './logo.svg';
import MainTable from './MainTable';

import './App.css';

const db = new PouchDB('http://localhost:5984/WatchList');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	rows: [],
      value: ''
    }
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  }

	componentDidMount() {
		db.allDocs({
			include_docs: true,
			attachments: true
		})
			.then(({ rows }) => this.setState({ rows }))
			.catch(err => console.log(err));
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Watch List</h2>
        </div>
        <p className="App-intro">
          Click to add: <code>{this.state.value}</code>
        </p>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
				<MainTable rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
