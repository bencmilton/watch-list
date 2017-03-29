import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import MainList from './components/MainList';
import AddTitleInput from './components/AddTitleInput';
import MovieList from './components/MovieList';
import TvList from './components/ShowList';
import NotFound from './components/NotFound';
import Header from './components/Header';

const Routes = props => (
	<Router {...props}>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={MainList} />
				<Route exact path="/add-title" component={AddTitleInput} />
				<Route exact path="/movie-list" component={MovieList} />
				<Route exact path="/tv-list" component={TvList} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default Routes;
