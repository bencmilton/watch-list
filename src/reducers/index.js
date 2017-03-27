import {combineReducers} from 'redux';

import data from './data-reducer.js';

const rootReducer = combineReducers({
	data
});

export default rootReducer;