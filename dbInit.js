var PouchDB = require('pouchdb');
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

	db.put(document)
		.then(response => console.log('response --> ', response))
		.catch(err => console.log(err));
});
