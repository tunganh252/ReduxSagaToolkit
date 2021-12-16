import { Box } from '@material-ui/core';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';

export interface IStudentFeatureProps {}

export default function StudentFeature(props: IStudentFeatureProps) {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="add" element={<AddEditPage />} />
        <Route path=":id" element={<AddEditPage />} />
      </Routes>
    </Box>
  );
}
