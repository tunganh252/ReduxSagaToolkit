import { Box, Button, FormControl, Grid, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { Search } from '@material-ui/icons';
import { ICity, IListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';
interface StudentFilterProps {
  filter: IListParams;
  cityList: ICity[];
  onChange?: (newFilter: IListParams) => void;
  onSearchChange?: (newFilter: IListParams) => void;
}

const StudentFilter = ({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) => {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    if (!onChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: IListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
    if (searchRef.current) searchRef.current.value = '';
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              defaultValue={filter.name_like}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((x) => {
                return (
                  <MenuItem key={x.code} value={x.code}>
                    {x.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
