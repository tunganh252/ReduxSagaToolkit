import { call, takeLatest, put, debounce } from 'redux-saga/effects';
import studentApi from 'api/studenApi';
import { studentActions } from './studentSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IListParams, IListResponse, IStudent } from 'models';

function* fetchStudentList(action: PayloadAction<IListParams>) {
  try {
    const response: IListResponse<IStudent> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<IListParams>) {
  console.log('run saga debounce');

  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
