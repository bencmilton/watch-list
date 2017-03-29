import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Column, SortDirection, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

import { formatDate } from '../../helpers';

const COLUMN_WIDTH = 500;
const COLUMN_NAMES = ['title', 'season', 'episode', 'source', 'type'];

export default class MainTable extends Component {

	constructor (props) {
		super(props);
		this.state = {
			sortBy: 'date',
			sortDirection: SortDirection.ASC
		}
	}

	sort = ({ sortBy, sortDirection }) => {
		this.setState({
			sortBy,
			sortDirection
		});
	}

	render() {
		const {
			sortBy,
			sortDirection
		} = this.state;

		const { data } = this.props;

		if (!data.length) {
			return (
				<p>Loading...</p>
			);
		}

		const sortDir = sortDirection === 'ASC' ? 'asc' :'desc';
		const sortedList = _.orderBy(data, [sortBy], [sortDir]);

		return (
			<Table
				width={900}
				height={600}
				headerHeight={20}
				rowHeight={30}
				rowCount={sortedList.length}
				rowGetter={({ index }) => sortedList[index]}
				sort={this.sort}
				sortBy={sortBy}
				sortDirection={sortDirection}
			>
				<Column
					label="date"
					dataKey="date"
					width={COLUMN_WIDTH}
					cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) =>
						formatDate(sortedList[rowIndex].date)
					}
				/>
				{_.map(COLUMN_NAMES, name =>
					<Column
						key={name}
						label={name}
						dataKey={name}
						width={COLUMN_WIDTH}
					/>
				)}
			</Table>
		);
	}
}

MainTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		date: PropTypes.string,
		episode: PropTypes.string,
		season: PropTypes.string,
		source: PropTypes.string,
		title: PropTypes.string,
		type: PropTypes.string
	}))
};
