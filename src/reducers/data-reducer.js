import _ from 'lodash';

import * as types from '../actions/action-types';

const defaultState = {
	allData: [],
	movies: [],
	tvShows: []
};

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
				movies: [ ...flatData.filter(item => item.type === 'Movie') ],
				tvShows: [ ...flatData.filter(item => item.type === 'TV') ],
			};
		default:
			return state;
	}
};
