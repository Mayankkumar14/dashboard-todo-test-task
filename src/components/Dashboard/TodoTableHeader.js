import React from 'react'
import {
  TableCell,
  TableRow,
  TableHead
} from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'userId', label: 'User ID', minWidth: 100 },
  { id: 'completed', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Actions', minWidth: 100 },
];

const TodoTableHeader = ({ classes }) => {
  return (
    <TableHead>
      <TableRow>
        {
          columns.map(({ id, minWidth, label }) => (
            <TableCell
              key={id}
              align={'center'}
              style={{ minWidth }}
              className={classes.tableHeading}
            >
              {label}
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

export default React.memo(TodoTableHeader);

