import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import AddTitleInput from './components/AddTitleInput';
import DetailPage from './components/DetailPage';
import Header from './components/Header';
import MainList from './components/MainList';
import MovieList from './components/MovieList';
import NotFound from './components/NotFound';
import TvList from './components/ShowList';

const Routes = props => (
	<Router {...props}>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={MainList} />
				<Route exact path="/add-title" component={AddTitleInput} />
				<Route exact path="/movie-list" component={MovieList} />
				<Route exact path="/tv-list" component={TvList} />
				<Route exact path="/title/:id" component={DetailPage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default Routes;
