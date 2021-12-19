import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ICity, IListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: ICity[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<IListResponse<ICity>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Acitons
export const cityActions = citySlice.actions;

// Selectors
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: ICity }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

// Reducer
const cityReducer = citySlice.reducer;

export default cityReducer;
