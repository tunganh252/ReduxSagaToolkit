import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

const RadioGroupField = ({ name, control, label, disabled }: RadioGroupFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <TextField
        fullWidth
        size="small"
        margin="normal"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        variant="outlined"
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
        disabled={disabled}
      />
    </div>
  );
};

export default RadioGroupField;
