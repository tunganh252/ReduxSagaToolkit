import cityApi from 'api/cityApi';
import { ICity, IListResponse } from 'models';
import { call, takeLatest, put } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const response: IListResponse<ICity> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
