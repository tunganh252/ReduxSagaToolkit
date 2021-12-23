import { FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface SelectOption {
  label: string;
  value: number | string;
}

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

const SelectField = ({ name, control, label, disabled, options }: SelectFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      variant="outlined"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select labelId={`${name}_label`} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((select) => {
          return (
            <MenuItem key={select.value} value={select.value}>
              {select.label}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
