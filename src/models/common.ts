export interface IPaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPaginationParams;
}
