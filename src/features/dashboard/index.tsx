import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
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
import StatisticItem from './components/StatisticItem';
import { ChatBubble, ChatRounded, LinearScaleRounded, PeopleAlt } from '@material-ui/icons';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    width: '100%',
    position: 'absolute',
    top: theme.spacing(-1),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const dashboardLoading = useAppSelector(selectDashboardLoading);
  const dashboardStatistics = useAppSelector(selectDashboardStatistics);
  const dashboardHighestStudentList = useAppSelector(selectDashboardHighestStudentList);
  const dashboardLowestStudentList = useAppSelector(selectDashboardLowestStudentList);
  const dashboardRankingByCityList = useAppSelector(selectDashboardRankingByCityList);

  React.useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {dashboardLoading && <LinearProgress className={classes.loading} />}

      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={dashboardStatistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={dashboardStatistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={dashboardStatistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<LinearScaleRounded fontSize="large" color="primary" />}
            label="mark <= 5"
            value={dashboardStatistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All students ranking */}
      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={dashboardHighestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={dashboardLowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Rankings by city */}
      <Box mt={4}>
        <Typography variant="h4">Rankings by city</Typography>
        <Box mt={3}>
          <Grid container spacing={2}>
            {dashboardRankingByCityList.map((item) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={item.cityId}>
                  <Widget title={item.cityName}>
                    <StudentRankingList studentList={item.rankingList} />
                  </Widget>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
