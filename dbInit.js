var _ = require('lodash');
var PouchDB = require('pouchdb');
var rp = require('request-promise');

var data = require('./data');

var db = new PouchDB('http://localhost:5984/WatchList');

function getRuntime(runtime) {
	return runtime && _.toNumber(runtime.split(' min')[0]);
}

function getImdbVotes(str) {
	return _.toNumber(str.replace(/,/, ''));
}

function formatRes(entry, res) {
	if (res.Runtime > 250 &&!entry.fixedruntime) {
		console.error(`Runtime is really high: ${res.Runtime}. This probably isn\'t right. You probably need to add a "fixedruntime"`);
	}

	return {
		runtime: entry.fixedruntime ? getRuntime(entry.fixedruntime) : getRuntime(res.Runtime),
		year: _.toNumber(res.Year),
		rated: res.Rated,
		released: res.Released,
		genre: res.Genre,
		director: res.Director,
		writer: res.Writer,
		actors: res.Actors,
		plot: res.Plot,
		awards: res.Awards,
		poster: res.Poster,
		metascore: _.toNumber(res.Metascore),
		imdbRating: _.toNumber(res.imdbRating),
		imdbVotes: getImdbVotes(res.imdbVotes),
		imdbID: res.imdbID,
		tomatoURL: res.tomatoURL,
		dvdReleaseData: res.DVD,
		boxOffice: res.BoxOffice
	};
}

data.forEach(entry => {
	const document = {
		_id: entry.id,
		date: entry.date,
		title: entry.title,
		season: entry.season === '--' ? entry.season : _.toNumber(entry.season),
		episode: entry.episode === '--' ? entry.episode : _.toNumber(entry.episode),
		source: entry.source,
		type: entry.type
	};

	const contentType = entry.type === 'TV' ? 'series' : 'movie';
	const query = entry.imdbid ? `i=${entry.imdbid}` : `t=${entry.title}`;
	const uri = `http://www.omdbapi.com/?${query}&type=${contentType}&tomatoes=true`;
	console.log('Request uri: ', uri);
	return rp(uri).then(res => {
		res = JSON.parse(res);
		if (!res) {
			return document;
		}
		const merged = _.merge(document, formatRes(entry, res));
		db.put(merged)
			.then(response => console.log('response --> ', response))
			.catch(err => console.log(err));
	});
});
