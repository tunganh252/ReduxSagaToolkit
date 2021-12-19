import { Box, FormControl, Grid, InputLabel } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { ICity, IListParams } from 'models';
import React, { ChangeEvent } from 'react';

interface StudentFilterProps {
  filter: IListParams;
  city: ICity[];
  onChange?: (newFilter: IListParams) => void;
  onSearchChange?: (newFilter: IListParams) => void;
}

const StudentFilter = ({ filter, city, onChange, onSearchChange }: StudentFilterProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              defaultValue={filter.name_like}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
