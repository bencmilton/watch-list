import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import App from './components/App';
import AddTitleInput from './components/AddTitleInput';
import MovieList from './components/MovieList';
import TvList from './components/ShowList';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

const Routes = props => (
	<Router {...props}>
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/add-title" component={AddTitleInput} />
				<Route exact path="/movie-list" component={MovieList} />
				<Route exact path="/tv-list" component={TvList} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default Routes;
