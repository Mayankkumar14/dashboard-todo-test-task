import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Typography from '@mui/material/Typography';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { styled } from '@mui/styles';
import { useAppState } from '../../state';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const Container = styled('div')({
  '& form': {
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start',
    '& .MuiFormControl-root #select-label': {
      left: '-14px'
    },
    '& button': {
      marginTop: '10px'
    }
  }
});

const ModalAction = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
});


const TodoModal = ({ open, handleClose, todo }) => {
  const { data, addTodo, editTodo } = useAppState();

  const [todoData, setTodoData] = useState({
    title: {
      value: todo?.title || '',
      error: false,
      errorMsg: 'Enter Todo Title'
    },
    userId: {
      value: todo?.userId || '',
      error: false,
      errorMsg: 'Enter User Id'
    },
    completed: {
      value: todo?.completed || false,
      error: false,
      errorMsg: 'Select Todo Status'
    }
  });

  const { title, userId, completed } = todoData;

  const todoFieldHandler = (e, key) => {
    console.log({ key })
    setTodoData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        error: false,
        value: e.target.value
      }
    }))
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const fieldsArray = Object.keys(todoData);

    for (let index = 0; index < fieldsArray.length; index++) {
      const field = fieldsArray[index];
      const value = todoData[field].value;

      if (value === '') {
        setTodoData(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            error: true
          }
        }))
      }
    }

    if (!title.value || !userId.value) return;

    if (todo?.id) {
      editTodo({
        id: todo.id,
        title: todoData.title.value,
        userId: todoData.userId.value,
        completed: todoData.completed.value
      })
      handleClose();
      return;
    }
    addTodo({
      id: data.length + 1,
      title: todoData.title.value,
      userId: todoData.userId.value,
      completed: todoData.completed.value
    })
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {todo && todo.id ? 'Edit' : 'Add'} Todo
        </Typography>
        <Container>
          <form onSubmit={formSubmitHandler}>
            <TextField
              label="Title"
              variant="standard"
              placeholder='Enter Title'
              fullWidth
              value={todoData.title.value}
              onChange={(e) => todoFieldHandler(e, 'title')}
              error={todoData.title.error}
              helperText={todoData.title.errorMsg}
            />

            <TextField
              label="User ID"
              variant="standard"
              placeholder='Enter User ID'
              fullWidth
              value={todoData.userId.value}
              error={todoData.userId.error}
              helperText={todoData.userId.errorMsg}
              onChange={(e) => todoFieldHandler(e, 'userId')}
            />

            <FormControl fullWidth c>
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                variant="standard"
                id="select"
                value={todoData.completed.value}
                label="Status"
                onChange={(e) => todoFieldHandler(e, 'completed')}
              >
                <MenuItem value={true}>Completed</MenuItem>
                <MenuItem value={false}>Not Completed</MenuItem>
              </Select>
            </FormControl>
            <ModalAction>
              <Button type='button' onClick={handleClose}>Close</Button>
              <Button type='submit'>{todo && todo.id ? 'Edit' : 'Add'}</Button>
            </ModalAction>
          </form>
        </Container>
      </Box>
    </Modal >
  )
}

export default TodoModal;