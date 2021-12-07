import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IStudent } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}
export interface RankingByCity {
  cityId: string;
  rankingList: IStudent[];
}

export interface IDashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: IStudent[];
  lowestStudentList: IStudent[];
  rankingByCityList: RankingByCity[];
}

const initialState: IDashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHigestStudentList(state, action: PayloadAction<IStudent[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<IStudent[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectDashboardHighestStudentList = (state: RootState) =>
  state.dashboard.highestStudentList;
export const selectDashboardRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;

// Reducer
const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
