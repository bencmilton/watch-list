import { Column, Table } from 'react-virtualized';
import React, { Component } from 'react';
import 'react-virtualized/styles.css';

const COLUMN_WIDTH = 500;
const COLUMN_NAMES = ['date', 'title', 'season', 'episode', 'source', 'type'];

export default class MainTable extends Component {
	render() {
		const { rows } = this.props;

		if (!rows.length) {
			return (
				<p>Loading...</p>
			);
		}

		const flatData = rows.map(item => ({
			...item.doc,
			...item
		}));

		return (
			<Table
				width={900}
				height={600}
				headerHeight={20}
				rowHeight={30}
				rowCount={flatData.length}
				rowGetter={({ index }) => flatData[index]}
			>
				{COLUMN_NAMES.map(name =>
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
