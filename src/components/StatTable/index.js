import _ from 'lodash';
import React, { PropTypes } from 'react';
import './style.css';

import {
	getImdbScore,
	getRuntime,
	minutesToHours
} from '../../helpers';

export default function StatTable({ data }) {
	const minutesWatched = _.sumBy(data, getRuntime);
	const minScore = _.minBy(data, getImdbScore);
	const maxScore = _.maxBy(data, getImdbScore);
	return (
		<div className="stat-table--container">
			<table>
				<tbody>
					<tr>
						<td><b>Time wasted</b></td>
						<td>{minutesToHours(_.round(minutesWatched, 1))}</td>
					</tr>
					<tr>
						<td><b>Highest score</b></td>
						<td>{maxScore.imdbRating} ({maxScore.title})</td>
					</tr>
					<tr>
						<td><b>Average score</b></td>
						<td>{_.round(_.meanBy(data, getImdbScore), 1)}</td>
					</tr>
					<tr>
						<td><b>Lowest score</b></td>
						<td>{minScore.imdbRating} ({minScore.title})</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

StatTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		imdbRating: PropTypes.string,
		Runtime: PropTypes.string,
		title: PropTypes.string
	}))
};
