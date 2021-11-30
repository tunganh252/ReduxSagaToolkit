export interface IPaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPaginationParams;
}

export interface IListParams {
  _page: number;
  _limit: number;
  _sort: string;
  _order: 'asc' | 'desc';

  [key: string]: any;
}
