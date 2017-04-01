import _ from 'lodash';
import PouchDB from 'pouchdb';
import { fork, put, takeEvery } from 'redux-saga/effects'
import rp from 'request-promise';

import * as actions from './actions/action-types';
import { formatRes } from './helpers';

const db = new PouchDB('http://localhost:5984/WatchList');

function* updateContentAsFavorite(action) {
	try {
		const doc = yield db.get(action.id);
		doc.favorite = true;

		db.put(doc);

		yield put({
			type: actions.ADD_AS_FAVORITE_SUCCEEDED,
			data: doc
		});
	} catch (err) {
		yield put({
			type: actions.ADD_AS_FAVORITE_FAILED,
			message: err.message
		});
	}
}

function* unFavoriteContent(action) {
	try {
		const doc = yield db.get(action.id);
		doc.favorite = false;

		db.put(doc);

		yield put({
			type: actions.REMOVE_AS_FAVORITE_SUCCEEDED,
			data: doc
		});
	} catch (err) {
		yield put({
			type: actions.REMOVE_AS_FAVORITE_FAILED,
			message: err.message
		});
	}
}

function* addTitleToDb(action) {
	const entry = action.data;
	const contentType = entry.type === 'TV' ? 'series' : 'movie';
	const uri = `http://www.omdbapi.com/?t=${entry.title}&type=${contentType}&tomatoes=true`;

	try {
		const res = yield rp(uri);
		const parsedRes = JSON.parse(res);
		const merged = _.merge(entry, formatRes(entry, parsedRes));
		yield db.put(merged);

		yield put({
			type: actions.ADD_TITLE_SUCCEEDED,
			data: merged
		});
	} catch (err) {
		yield put({
			type: actions.ADD_TITLE_FAILED,
			message: err.message
		});
	}
}

function* fetchAllData(action) {
	try {
		const data = yield db.allDocs({
			include_docs: true,
			attachments: true
		});

		yield put({
			type: actions.GET_ALL_DATA_SUCCEEDED,
			data: data.rows
		});
	} catch (err) {
		yield put({
			type: actions.GET_ALL_DATA_FAILED,
			message: err.message
		});
	}
}

function* addTitle() {
	yield takeEvery(actions.ADD_TITLE, addTitleToDb);
}

function* getAllTitles() {
	yield takeEvery(actions.GET_ALL_DATA, fetchAllData);
}

function* addAsFavorite() {
	yield takeEvery(actions.ADD_AS_FAVORITE, updateContentAsFavorite);
}

function* removeAsFavorite() {
	yield takeEvery(actions.REMOVE_AS_FAVORITE, unFavoriteContent);
}

export default function* root() {
	yield [
		fork(addTitle),
		fork(addAsFavorite),
		fork(removeAsFavorite),
		fork(getAllTitles)
	]
}
