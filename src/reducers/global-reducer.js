import * as types from '../actions/action-types';

const defaultState = {
	showStats: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case types.TOGGLE_STATS:
			return {
				...state,
				showStats: !state.showStats
			};
		default:
			return state;
	}
};
