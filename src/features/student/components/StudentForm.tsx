import React from 'react';
import { IStudent } from 'models';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import SelectField from 'components/FormFields/SelectField';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';

interface StudentFormProps {
  initialValues?: IStudent;
  onSubmit?: (formValues: IStudent) => void;
}

const StudentForm = ({ initialValues, onSubmit }: StudentFormProps) => {
  const cityOptions = useAppSelector(selectCityOptions);

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
        <SelectField name="city" control={control} label="City" options={cityOptions} />
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
