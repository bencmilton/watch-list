import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';

const COLUMN_WIDTH = 500;
const ROW_HEIGHT = 100;

export default class TitleTable extends Component {

	render() {
		const { data } = this.props;

		if (!data.length) {
			return (
				<p>Loading...</p>
			);
		}

		return (
			<Table
				width={900}
				height={600}
				headerHeight={20}
				rowHeight={ROW_HEIGHT}
				rowCount={data.length}
				rowGetter={({ index }) => data[index]}
			>
				<Column
					dataKey="#"
					width={50}
					cellRenderer={
						({ cellData, columnData, dataKey, rowData, rowIndex }) => rowIndex
					}
				/>
				<Column
					dataKey="Poster"
					width={250}
					cellRenderer={
						({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData &&
							<a href={`http://www.imdb.com/title/${data[rowIndex].imdbID}`}>
								<img style={{ height: ROW_HEIGHT, width: 66 }} src={cellData} alt={cellData} />
							</a>
					}
				/>
				<Column
					label="Title"
					dataKey="Title"
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
