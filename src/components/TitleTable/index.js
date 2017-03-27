import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';

const COLUMN_WIDTH = 500;
const COLUMN_NAMES = ['title'];

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
				rowHeight={30}
				rowCount={data.length}
				rowGetter={({ index }) => data[index]}
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
