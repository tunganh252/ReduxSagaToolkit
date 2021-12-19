import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IListParams, IListResponse, IPaginationParams, IStudent } from 'models';

export interface StudentState {
  loading: boolean;
  list: IStudent[];
  filter: IListParams;
  pagination: IPaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<IListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<IListResponse<IStudent>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<IListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<IListParams>) {},
  },
});

// Actions
export const studentActions = studentSlice.actions;

// Selectors
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reducer
const studentReducer = studentSlice.reducer;

export default studentReducer;
