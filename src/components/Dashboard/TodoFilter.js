import React from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField
} from '@mui/material';

const TodoFilter = ({ 
  classes,
  handleOpenModal,
  handleChangeFilterOptions,
  filterOptions
}) => {
  const handleFilterChange = (event, filter) => {
    handleChangeFilterOptions(prev => ({ ...prev, [filter]: event.target.value }));
  };

  const resetFilter = () => {
    handleChangeFilterOptions({ searchText: '', todoStatus: '' });
  }

  return (
    <div className={classes.tableHeaderActions}>
      <TextField
        label='Search'
        variant='standard'
        placeholder='Enter Title or User ID'
        value={filterOptions.searchText}
        onChange={(e) => handleFilterChange(e, 'searchText')}
      />

      <FormControl className={classes.selectBox}>
        <InputLabel id='select-label'>Status</InputLabel>
        <Select
          labelId='select-label'
          variant='standard'
          id='select'
          value={filterOptions.todoStatus}
          label='Status'
          onChange={(e) => handleFilterChange(e, 'todoStatus')}
        >
          <MenuItem value={true}>Completed</MenuItem>
          <MenuItem value={false}>Not Completed</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={resetFilter}>
        Reset
      </Button>
      
      <Button onClick={handleOpenModal}>
        Add Todo
      </Button>
    </div>
  )
}

export default TodoFilter
