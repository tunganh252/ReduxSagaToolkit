import { call, takeLatest, put } from 'redux-saga/effects';
import studentApi from 'api/studenApi';
import { studentActions } from './studentSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IListParams, IListResponse, IStudent } from 'models';

function* fetchStudentList(action: PayloadAction<IListParams>) {
  try {
    const response: IListResponse<IStudent> = yield call(studentApi.getAll, action.payload);
    console.log(response);

    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
}
