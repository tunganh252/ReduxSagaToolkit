import React from 'react';
import { IStudent } from 'models';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';

interface StudentFormProps {
  initialValues?: IStudent;
  onSubmit?: (formValues: IStudent) => void;
}

const StudentForm = ({ initialValues, onSubmit }: StudentFormProps) => {
  const { control, handleSubmit } = useForm<IStudent>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: IStudent) => {
    console.log('formValues: ', formValues);
  };

  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Full name" />
        <InputField name="mark" control={control} label="Full name" />
        <InputField name="gender" control={control} label="Full name" />
        <InputField name="city" control={control} label="Full name" />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;
