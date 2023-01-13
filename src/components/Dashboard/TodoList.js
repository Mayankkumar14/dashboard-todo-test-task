import React, { useState } from 'react';
import { Card } from '@mui/material';
import TodoModal from '../Modal/TodoModal';
import TodoFilter from './TodoFilter';
import TodoListTable from './TodoListTable';

const TodoList = ({ data, loading, deleteTodo, classes }) => {
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const [filterOptions, setFilterOptions] = useState({
    searchText: '',
    todoStatus: ''
  });

  const storeCurrentTodoEditState = (todo) => {
    setTodoToEdit(todo);
  }

  const handleChangeFilterOptions = (states) => {
    setFilterOptions(states)
  }

  const handleOpenModal = () => {
    if (todoToEdit?.id) {
      setTodoToEdit(null);
    }
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      <Card 
        elevation={3} 
        sx={{ marginBottom: 5 }} 
        className={classes.tableContainer}
      >
        <div className={classes.tableHeader}>
          <h1>Todo List</h1>
          <TodoFilter 
            filterOptions={filterOptions}
            handleChangeFilterOptions={handleChangeFilterOptions}
            classes={{
              selectBox: classes.selectBox,
              tableHeaderActions: classes.tableHeaderActions
            }}
            handleOpenModal={handleOpenModal}
          />
        </div>

        <TodoListTable 
          classes={classes}
          data={data} 
          loading={loading} 
          filterOptions={filterOptions}
          deleteTodo={deleteTodo}
          storeCurrentTodoEditState={storeCurrentTodoEditState}
          handleOpenModal={handleOpenModal}
        />
        
      </Card>
      {
        openModal 
        && <TodoModal 
              open={openModal} 
              handleClose={handleCloseModal} 
              todo={todoToEdit} 
            />
      }
    </>
  )
}

export default TodoList
