import { all, call, takeLatest, put } from 'redux-saga/effects';
import { dashboardActions } from './dashboardSlice';
import { ICity, IListResponse, IStudent } from 'models';
import studentApi from 'api/studenApi';
import cityApi from 'api/cityApi';

function* fetchStatistics() {
  const responseList: Array<IListResponse<IStudent>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 5, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 5, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 5, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 5, mark_lte: 5 }),
  ]);

  const statisticsList = responseList.map((x) => x.pagination._totalRows);

  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
  );
}
function* fetchHighestStudentList() {
  const { data }: IListResponse<IStudent> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardActions.setHigestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: IListResponse<IStudent> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  // Fetch city list
  const { data: cityList }: IListResponse<ICity> = yield call(cityApi.getAll);

  // Fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
      city: x.code,
    })
  );

  const responseList: Array<IListResponse<IStudent>> = yield all(callList);

  const rankingCityByList = responseList.map((x, i) => ({
    cityId: cityList[i].code,
    rankingList: x.data,
  }));

  // Update state
  yield put(dashboardActions.setRankingByCityList(rankingCityByList));
}
function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
