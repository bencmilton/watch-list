import _ from 'lodash';
import React, { PropTypes } from 'react';
import './style.css';

import SourceTable from '../SourceTable';
import { minutesToHours } from '../../helpers';

export default function StatTable({ data, showStats }) {
	if (!data.length) {
		return null;
	}

	const minutesWatched = _.sumBy(data, 'runtime');
	const minScore = _.minBy(data, 'imdbRating');
	const maxScore = _.maxBy(data, 'imdbRating');
	return (
		<div className={`stat-table--container ${showStats ? 'stat-table--container__open' : ''}`}>
			<div className="stat-table--left-panel">
				<h4>General</h4>
				<table>
					<tbody>
					<tr>
						<td><b>Total Count</b></td>
						<td>{data.length}</td>
					</tr>
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
						<td>{_.round(_.meanBy(data, 'imdbRating'), 1)}</td>
					</tr>
					<tr>
						<td><b>Lowest score</b></td>
						<td>{minScore.imdbRating} ({minScore.title})</td>
					</tr>
					</tbody>
				</table>
			</div>
			<SourceTable data={data} />
		</div>
	);
}

StatTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		imdbRating: PropTypes.number,
		runtime: PropTypes.number,
		title: PropTypes.string
	}))
};
