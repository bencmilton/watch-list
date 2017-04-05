var _ = require('lodash');

module.exports.getImdbScore = function getImdbScore(content) {
	return content.imdbRating && _.toNumber(content.imdbRating);
}

module.exports.getRuntime = function getRuntime(content) {
	return content.Runtime && _.toNumber(content.Runtime.split(' min')[0]);
}

module.exports.minutesToHours = function minutesToHours(minutes) {
	const hours = _.floor(minutes / 60);
	return `${_.floor(hours / 24)} days, ${hours % 24} hours, ${minutes % 60} minutes`;
}

module.exports.formatDate = function formatDate(datetime) {
	const [ date ] = datetime.split('T');
	const [ year, month, day ] = date.split('-');
	const formattedMonth = month[0] === '0' ? month[1] : month;
	const formattedDay = day[0] === '0' ? day[1] : day;
	return {
		formattedDate: `${formattedMonth}/${formattedDay}/${year}`,
		year: _.toNumber(year),
		day: _.toNumber(formattedDay),
		month: _.toNumber(formattedMonth)
	};
}

module.exports.formatJsDate = function formatJsDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
}

function _getRuntime(runtime) {
	return runtime && _.toNumber(runtime.split(' min')[0]);
}

function _getImdbVotes(str) {
	return str && _.toNumber(str.replace(/,/, ''));
}

module.exports.formatRes = function formatRes(entry, res) {
	if (res.Runtime > 250 &&!entry.fixedruntime) {
		console.error(`Runtime is really high: ${res.Runtime}. This probably isn't right. You probably need to add a "fixedruntime"`);
	}

	return {
		runtime: entry.fixedruntime ? _getRuntime(entry.fixedruntime) : _getRuntime(res.Runtime),
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
		imdbVotes: _getImdbVotes(res.imdbVotes),
		imdbID: res.imdbID,
		tomatoURL: res.tomatoURL,
		dvdReleaseData: res.DVD,
		boxOffice: res.BoxOffice
	};
}
