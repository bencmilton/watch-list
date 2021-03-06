import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Column, SortDirection, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

const COLUMN_WIDTH = 500;
const TITLE_COLUMN_WIDTH = 1000;
const COLUMN_NAMES = ['title', 'season', 'episode', 'runtime', 'source', 'type'];

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
					dataKey="rawDate"
					width={COLUMN_WIDTH}
					cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) =>
						sortedList[rowIndex].date
					}
				/>
				{_.map(COLUMN_NAMES, name =>
					<Column
						key={name}
						label={name}
						dataKey={name}
						width={name === 'title' ? TITLE_COLUMN_WIDTH : COLUMN_WIDTH}
					/>
				)}
				<Column
					label="favorite"
					dataKey="favorite"
					width={COLUMN_WIDTH}
					cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) =>
						sortedList[rowIndex].favorite && '✅'
					}
				/>
			</Table>
		);
	}
}

MainTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		date: PropTypes.string,
		episode: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		runtime: PropTypes.number,
		season: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		source: PropTypes.string,
		title: PropTypes.string,
		type: PropTypes.string
	}))
};
