import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Column, SortDirection, Table } from 'react-virtualized';

const COLUMN_WIDTH = 500;
const ROW_HEIGHT = 100;

export default class TitleTable extends Component {

	constructor (props) {
		super(props);
		this.state = {
			shouldSort: false,
			sortBy: 'index',
			sortDirection: SortDirection.ASC
		}
	}

	sort = ({ sortBy, sortDirection }) => {
		this.setState({
			shouldSort: true,
			sortBy,
			sortDirection
		});
	}

	render() {
		const { data } = this.props;
		const {
			shouldSort,
			sortBy,
			sortDirection
		} = this.state;

		if (!data.length) {
			return (
				<p>Loading...</p>
			);
		}

		const sortDir = sortDirection === 'ASC' ? 'asc' :'desc';
		const sortedList = shouldSort
			? _.orderBy(data, [sortBy], [sortDir])
			: data;

		return (
			<Table
				width={900}
				height={600}
				headerHeight={20}
				rowHeight={ROW_HEIGHT}
				rowCount={data.length}
				rowGetter={({ index }) => sortedList[index]}
				sort={this.sort}
				sortBy={sortBy}
				sortDirection={sortDirection}
			>
				<Column
					dataKey="#"
					width={50}
					cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) =>
						rowIndex + 1
					}
				/>
				<Column
					dataKey="poster"
					width={250}
					cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData &&
						<a href={`http://www.imdb.com/title/${sortedList[rowIndex].imdbID}`}>
							<img style={{ height: ROW_HEIGHT, width: 66 }} src={cellData} alt={cellData} />
						</a>
					}
				/>
				<Column
					label="Title"
					dataKey="title"
					width={COLUMN_WIDTH}
				/>
				<Column
					label="IMDb"
					dataKey="imdbRating"
					width={COLUMN_WIDTH}
				/>
			</Table>
		);
	}
}

TitleTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		Poster: PropTypes.string,
		title: PropTypes.string,
		imdbRating: PropTypes.number,
	}))
};
