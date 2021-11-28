import { all } from '@redux-saga/core/effects';
import counterSaga from '../features/counter/counterSaga';

const helloSaga = () => {
  console.log('Hello Saga');
};

export default function* rootSaga() {
  console.log('rootSaga nè');

  yield all([helloSaga(), counterSaga()]);
}
