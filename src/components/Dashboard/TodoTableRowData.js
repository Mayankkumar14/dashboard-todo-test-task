import React from 'react'
import {
  Button,
  TableCell,
  TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoTableRowData = ({
  id,
  title,
  userId,
  completed,
  editTodoHandler,
  deleteTodoHandler
}) => {
  return (
    <TableRow key={id}>
      <TableCell align='center'>{id}</TableCell>
      <TableCell align='center'>{title}</TableCell>
      <TableCell align='center'>{userId}</TableCell>
      <TableCell align='center'>{completed ? 'Completed' : 'Not Completed'}</TableCell>
      <TableCell align='center'>      
        <Button onClick={() => editTodoHandler({id, title, userId, completed})}>
          <EditIcon />
        </Button>
        <Button onClick={() => deleteTodoHandler(id)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default React.memo(TodoTableRowData);

