import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import { getLocalState, setLocalState } from '../utils';
import { CONFIG } from '../config';

export const StateContext = createContext(null);

export default function AppStateProvider(props) {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'info'
  });

  const [loading, setLoading] = useState(false);
  const localStateData = getLocalState('todos');

  const getTodo = async () => {
    if (localStateData && localStateData.length > 0) {
      setData(localStateData);
    } else {
      try {
        setLoading(true)
        const response = await fetch(CONFIG.TODO_API_URL);
        const result = await response.json();
        setData(result);
        setLocalState('todos', result)
      } catch (error) {
        setAlert({
          open: true,
          type: 'error',
          message: error.message
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const addTodo = async (todo) => {
    try {
      const response = await fetch(CONFIG.TODO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      })
      // We are not using this var as test API does not add new todo in list.
      // eslint-disable-next-line
      const result = await response.json();

      setData(prev => {
        const newData = [todo, ...prev]
        setLocalState('todos', newData);
        return newData;
      });

      setAlert({
        open: true,
        type: 'success',
        message: 'Task Added Successfully'
      })
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.message
      })
    }
  }

  const editTodo = async (todo) => {
    try {
      if (todo.id <= 200) {
        const response = await fetch(`${CONFIG.TODO_API_URL}/${todo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo)
        });

        // We are not using this var as test API does not add new todo in list.
        // eslint-disable-next-line
        const result = await response.json();
      }
      const todoIndex = data.findIndex(item => item.id === todo.id);
      data[todoIndex] = { ...todo };
      setData([...data])
      setLocalState('todos', data)
      setAlert({
        open: true,
        type: 'success',
        message: 'Task Updated Successfully'
      })
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.message
      })
    }
  }

  const deleteTodo = async (todoId) => {
    try {
      if (todoId <= 200) {
        const response = await fetch(`${CONFIG.TODO_API_URL}/${todoId}`, {
          method: 'DELETE'
        })
        await response.json();
      }
      setData(prev => {
        const newData = prev.filter((item) => item.id !== todoId)
        setLocalState('todos', newData)
        return newData
      });
      setAlert({
        open: true,
        type: 'success',
        message: 'Task Deleted Successfully'
      })
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.message
      })
    }
  }

  useEffect(() => {
    getTodo();
    // eslint-disable-next-line
  }, [])

  let contextValue = {
    data,
    loading,
    alert,
    setAlert,
    addTodo,
    editTodo,
    deleteTodo
  }

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {props.children}
    </StateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
