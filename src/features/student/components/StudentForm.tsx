import React, { useState } from 'react';
import { IStudent } from 'models';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import SelectField from 'components/FormFields/SelectField';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

interface StudentFormProps {
  initialValues?: IStudent;
  onSubmit?: (formValues: IStudent) => void;
}

const StudentForm = ({ initialValues, onSubmit }: StudentFormProps) => {
  const cityOptions = useAppSelector(selectCityOptions);

  const [error, setError] = useState<string>();

  // yup - validation
  const schema = yup
    .object({
      name: yup
        .string()
        .required('Please enter name')
        .test('two-words', 'Please enter at least 2 words.', (value) => {
          if (!value) return true;
          const parts = value?.split(' ') || [];
          return parts.filter((x) => !!x).length >= 2;
        }),
      age: yup
        .number()
        .positive('please enter the positive number.')
        .integer('Please enter an integer')
        .min(12, 'Min is 12.')
        .max(80, 'Max is 80.')
        .required('Please enter age.')
        .typeError('Please enter valid number.'),
      mark: yup
        .number()
        .positive('please enter the positive number.')
        .max(10, 'Max is 10.')
        .typeError('Please enter valid number.')
        .required('Please enter mark.'),
      gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please select either male or female.')
        .required(),
      city: yup.string().required('Please select city.'),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IStudent>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: IStudent) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />

        <RadioGroupField
          name="gender"
          label="Gender"
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" />
        <InputField name="mark" control={control} label="Mark" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}
        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />} &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;
