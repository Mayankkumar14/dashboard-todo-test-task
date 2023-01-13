import React, { useState, useCallback } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination
} from '@mui/material';
import { CONFIG } from '../../config';
import TodoTableRowData from './TodoTableRowData';
import TodoTableHeader from './TodoTableHeader';

const TodoListTable = ({
  classes,
  handleOpenModal,
  data, 
  filterOptions,
  loading, 
  deleteTodo,
  storeCurrentTodoEditState
}) => {
  const [page, setPage] = useState(0);
  const { searchText, todoStatus } = filterOptions;
  const [rowsPerPage, setRowsPerPage] = useState(CONFIG.ROWS_PER_PAGE);

  const editTodoHandler = useCallback((todo) => {
    handleOpenModal(true);
    storeCurrentTodoEditState(todo);
    // eslint-disable-next-line
  }, [])

  const deleteTodoHandler = useCallback((todoId) => {
    deleteTodo(todoId);
    // eslint-disable-next-line
  }, [])

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
    // eslint-disable-next-line
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
    // eslint-disable-next-line
  }, []);

  const filteredData = data?.length && data.filter((item) => {
    if (!searchText && todoStatus === '') return item;
    if (!searchText && todoStatus !== '') return item.completed === todoStatus;

    if (searchText && todoStatus === '') {
      return (
        item.title.toLowerCase().indexOf(searchText) >= 0 ||
        String(item.userId).indexOf(searchText) >= 0
      );
    }

    return (
      item.completed === todoStatus && (
        item.title.toLowerCase().indexOf(searchText) >= 0 ||
        String(item.userId).indexOf(searchText) >= 0
      )
    );
  })

  return (
    <Paper className={classes.paper}>
      {loading && 'loading...'}

      {!loading && data && data.length > 0 && (
        <>
          <TableContainer >
            <Table stickyHeader aria-label='sticky table'>
              <TodoTableHeader classes={classes}/>
              <TableBody>
                {filteredData?.length 
                  ? filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ id, userId, title, completed }) => (
                      <TodoTableRowData
                        key={id}
                        id={id}
                        userId={userId}
                        title={title}
                        completed={completed}
                        editTodoHandler={editTodoHandler}
                        deleteTodoHandler={deleteTodoHandler}
                      />
                    )) 
                  : 'No data found'
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={CONFIG.ROWS_PER_PAGE_PAGINATION}
            component='div'
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  )
}

export default React.memo(TodoListTable);

