import _ from 'lodash';

import * as types from '../actions/action-types';

const defaultState = {
	allData: [],
	detailPage: {},
	movies: [],
	tvShows: []
};

function getAllOfType(allData, type) {
	const data = [];
	_.forEach(allData, item => {
		if (!_.includes(data, item[type])) {
			data.push(item[type]);
		}
	});
	return data;
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case types.GET_ALL_DATA_SUCCEEDED:
			const flatData = _.map(action.data, item => ({
				...item.doc,
				...item
			}));
			return {
				...state,
				allData: [ ...flatData ],
				movies: [ ..._.filter(flatData, item => item.type === 'Movie') ],
				tvShows: [ ..._.filter(flatData, item => item.type === 'TV') ],
				sources: getAllOfType(flatData, 'source')
			};
		case types.ADD_TITLE_SUCCEEDED:
			return {
				...state,
				allData: [
					...state.allData,
					action.data
				]
			};
		case types.GET_DETAIL_DATA:
			const detailPage = _.find(state.allData, { imdbID: action.imdbID });
			return {
				...state,
				detailPage
			};
		default:
			return state;
	}
};
