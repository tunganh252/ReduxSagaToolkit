import axiosClient from './axiosClient';
import { ICity, IListResponse } from 'models';

const studentApi = {
  getAll() {
    const url = '/students';
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};
