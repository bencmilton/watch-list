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

export const addTitle = data => {
	return {
		type: types.ADD_TITLE,
		data
	};
};

export const addAsFavorite = id => {
	return {
		type: types.ADD_AS_FAVORITE,
		id
	};
};

export const removeAsFavorite = id => {
	return {
		type: types.REMOVE_AS_FAVORITE,
		id
	};
};
