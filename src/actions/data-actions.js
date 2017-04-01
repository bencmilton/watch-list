import * as types from './action-types';

export const getAllData = () => {
	return {
		type: types.GET_ALL_DATA
	};
};

export const getDetailData = imdbID => {
	return {
		type: types.GET_DETAIL_DATA,
		imdbID
	};
};
