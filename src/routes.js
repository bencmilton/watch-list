import React from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch
} from 'react-router-dom';

import App from './components/App';
import AddTitleInput from './components/AddTitleInput';
import MovieList from './components/MovieList';
import NotFound from './components/NotFound';

const Routes = props => (
	<Router {...props}>
		<div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/add-title">Add Title</Link></li>
				<li><Link to="/movie-list">Movies</Link></li>
			</ul>
			<hr/>
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/add-title" component={AddTitleInput} />
				<Route exact path="/movie-list" component={MovieList} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default Routes;
