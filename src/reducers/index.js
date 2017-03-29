import {combineReducers} from 'redux';

import data from './data-reducer';
import global from './global-reducer';

const rootReducer = combineReducers({
	data,
	global
});

export default rootReducer;