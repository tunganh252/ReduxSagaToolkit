import { delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSagaStart, incrementSagaSuccess } from './counterSlice';

export function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 2s');

  // wait 2s
  yield delay(2000);

  // distpach action success
  yield put(incrementSagaSuccess(action.payload));
  console.log('Waiting done, success action');
}

export default function* counterSaga() {
  console.log('Counter Saga nè');
  yield takeLatest(incrementSagaStart.toString(), handleIncrementSaga);
}
