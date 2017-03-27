import PouchDB from 'pouchdb';
import { put, takeEvery } from 'redux-saga/effects'

import * as actions from './actions/action-types';

const db = new PouchDB('http://localhost:5984/WatchList');

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

function* mySaga() {
	yield takeEvery(actions.GET_ALL_DATA, fetchAllData);
}

export default mySaga;
