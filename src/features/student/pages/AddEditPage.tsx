import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studenApi';
import { IStudent } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AddEditPage = () => {
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);

  const [student, setStudent] = useState<IStudent>();

  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const response: IStudent = await studentApi.getById(studentId);
        if (response) setStudent(response);
      } catch (error) {
        console.log('Failed to fetch student details ', error);
      }
    })();
  }, [studentId]);

  console.log(111111, student);

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Box mt={3}>
        <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'} </Typography>
      </Box>
    </Box>
  );
};

export default AddEditPage;
