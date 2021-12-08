import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import {
  dashboardActions,
  selectDashboardHighestStudentList,
  selectDashboardLoading,
  selectDashboardLowestStudentList,
  selectDashboardRankingByCityList,
  selectDashboardStatistics,
} from './dashboardSlice';

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const dispatch = useAppDispatch();
  const dashboardLoading = useAppSelector(selectDashboardLoading);
  const dashboardStatistics = useAppSelector(selectDashboardStatistics);
  const dashboardHighestStudentList = useAppSelector(selectDashboardHighestStudentList);
  const dashboardLowestStudentList = useAppSelector(selectDashboardLowestStudentList);
  const dashboardRankingByCityList = useAppSelector(selectDashboardRankingByCityList);

  React.useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  console.log('Log Data: ', {
    dashboardLoading,
    dashboardStatistics,
    dashboardHighestStudentList,
    dashboardLowestStudentList,
    dashboardRankingByCityList,
  });

  return (
    <div>
      <p>Dashboard 1111</p>
    </div>
  );
}
