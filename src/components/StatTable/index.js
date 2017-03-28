import _ from 'lodash';
import React from 'react';

function getImdbScore(content) {
	return content.imdbRating && _.toNumber(content.imdbRating);
}

function getRuntime(content) {
	return content.Runtime && _.toNumber(content.Runtime.split(' min')[0]);
}

export default function StatTable({ data }) {
	const minScore = _.minBy(data, getImdbScore);
	const maxScore = _.maxBy(data, getImdbScore);
	return (
		<div>
			<p><b>Minutes watched</b>: {_.round(_.sumBy(data, getRuntime), 1)}</p>
			<p><b>IMDb</b></p>
			<p><b>Max score</b>: {maxScore.title}, {maxScore.imdbRating}</p>
			<p><b>Average score</b>: {_.round(_.meanBy(data, getImdbScore), 1)}</p>
			<p><b>Min score</b>: {minScore.title}, {minScore.imdbRating}</p>
		</div>
	);
}
