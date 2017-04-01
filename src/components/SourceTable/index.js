import _ from 'lodash';
import React, { PropTypes } from 'react';
import './style.css';

function getSourceData(data) {
	const sourceList = [];
	const sourceMap = _.reduce(data, (acc, item) => {
		if (acc[item.source]) {
			acc[item.source]++;
		} else {
			acc[item.source] = 1;
		}
		return acc;
	}, {});

	_.forEach(sourceMap, (value, key) => {
		sourceList.push({ key, value });
	});

	return _.orderBy(sourceList, 'value', ['desc']);
}

export default function SourceTable({ data }) {
	const sourceData = getSourceData(data);
	return (
		<div className="stat-table--right-panel">
			<h4>Source Table</h4>
			<table>
				<tbody>
				{_.map(sourceData, item =>
					<tr key={item.key}>
						<td><b>{item.key}</b></td>
						<td>{item.value}</td>
					</tr>
				)}
				</tbody>
			</table>
		</div>
	);
}

SourceTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		source: PropTypes.string
	}))
};
