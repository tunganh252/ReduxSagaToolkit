import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studenApi';
import { IStudent } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const AddEditPage = () => {
  const navigate = useNavigate();
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

  const handleStudentSubmitForm = async (formValues: IStudent) => {
    // TODO: handle submit here, call api to add/update student
    let dataRequest = {
      id: formValues.id,
      age: formValues.age,
      city: formValues.city,
      gender: formValues.gender,
      mark: formValues.mark,
      name: formValues.name,
    };

    if (isEdit) await studentApi.update(dataRequest);
    else await studentApi.add(dataRequest);

    // Redirect back to student list
    navigate('/admin/students');
  };

  const initialValues: IStudent = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as IStudent;

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

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentSubmitForm} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPage;
