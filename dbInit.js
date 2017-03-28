var _ = require('lodash');
var PouchDB = require('pouchdb');
var rp = require('request-promise');

var data = require('./data');

var db = new PouchDB('http://localhost:5984/WatchList');

data.forEach(entry => {
	const document = {
		_id: entry.id,
		date: entry.date,
		title: entry.title,
		season: entry.season,
		episode: entry.episode,
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
		const merged = _.merge(document, res);
		db.put(merged)
			.then(response => console.log('response --> ', response))
			.catch(err => console.log(err));
	});
});
