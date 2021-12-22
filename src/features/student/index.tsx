import { Box } from '@material-ui/core';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';

export interface IStudentFeatureProps {}

export default function StudentFeature(props: IStudentFeatureProps) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Box>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddEditPage />} />
        <Route path="/:studentId" element={<AddEditPage />} />
      </Routes>
    </Box>
  );
}
