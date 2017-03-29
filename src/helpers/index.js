import _ from 'lodash';

export function getImdbScore(content) {
	return content.imdbRating && _.toNumber(content.imdbRating);
}

export function getRuntime(content) {
	return content.Runtime && _.toNumber(content.Runtime.split(' min')[0]);
}

export function minutesToHours(minutes) {
	const hours = _.floor(minutes / 60);
	return `${_.floor(hours / 24)} days, ${hours % 24} hours, ${minutes % 60} minutes`;
}

export function formatDate(datetime) {
	const [ date ] = datetime.split('T');
	const [ year, month, day ] = date.split('-');
	return `${month}/${day}/${year}`;
}
