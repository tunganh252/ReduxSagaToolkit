import axiosClient from './axiosClient';
import { IListParams, IListResponse, IStudent } from 'models';

const studentApi = {
  getAll(params: IListParams): Promise<IListResponse<IStudent>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<IStudent> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  add(data: IStudent): Promise<IStudent> {
    const url = '/students';
    return axiosClient.post(url, data);
  },
  update(data: Partial<IStudent>): Promise<IStudent> {
    const url = `/students/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string | number): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
