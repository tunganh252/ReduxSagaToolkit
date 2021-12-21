import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studenApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { IListParams, IStudent } from 'models';
import React, { useEffect } from 'react';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions
} from '../studentSlice';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  loading: {
    width: '100%',
    position: 'absolute',
    top: theme.spacing(-1),
  },
}));

const ListPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const studentLoading = useAppSelector(selectStudentLoading);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);

  const cityList = useAppSelector(selectCityList);
  const cityListMap = useAppSelector(selectCityMap);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: IListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: IListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: IStudent) => {
    console.log(1111, student);

    try {
      // Remove student API
      await studentApi.remove(student?.id || "")

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter }
      dispatch(studentActions.setFilter(newFilter))

    } catch (error) {
      /// Toast Errorf
      console.log("failed to fetch list student ", error);
    }
  }

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {studentLoading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      <Box mt={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      {studentList && studentList.length > 0 ? (
        <>
          <Box mt={3}>
            <StudentTable studentList={studentList} cityMap={cityListMap}
              onRemove={handleRemoveStudent}
            />
          </Box>

          <Box my={3} display={'flex'} justifyContent={'center'}>
            <Pagination
              color="primary"
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              page={pagination._page}
              onChange={handleChange}
            />
          </Box>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
          <Typography variant="h4">No data...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ListPage;
