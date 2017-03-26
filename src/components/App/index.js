import PouchDB from 'pouchdb';
import React, { Component } from 'react';

import MainTable from '../MainTable';
import './style.css';

const db = new PouchDB('http://localhost:5984/WatchList');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	rows: []
    }
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
			<div>
				<MainTable rows={this.state.rows} />
			</div>
    );
  }
}

export default App;
