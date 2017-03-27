import * as types from '../actions/action-types';

export default (state = [], action) => {
	switch (action.type) {
		case types.GET_ALL_DATA_SUCCEEDED:
			return [...action.data];
		default:
			return state;
	}
};
