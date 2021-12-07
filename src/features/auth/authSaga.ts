import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'access_token');
    console.log('login', payload);
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Tung Anh',
      })
    );
    // redirect to admin page
  } catch (error) {
    yield put(authActions.loginFail());
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  console.log('logout');
  // redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    console.log('watch login');

    const isLoggedIn = localStorage.getItem('access_token');

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    } else
      yield put(
        authActions.loginSuccess({
          id: 1,
          name: 'Tung Anh',
        })
      );

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
