export interface IPaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPaginationParams;
}

export interface IListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  gender?: 'male' | 'female';
  mark_gte?: number;
  mark_lte?: number;
  [key: string]: any;
}
