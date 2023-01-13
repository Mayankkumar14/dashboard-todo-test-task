import TodoList from './TodoList';
import useStyles from './style';
import { BarChart } from './BarGraph';
import { useAppState } from '../../state';

const Dashboard = () => {
  const classes = useStyles();
  const { data, loading, deleteTodo } = useAppState();

  return (
    <>
      <div className={classes.dashboard}>
        <BarChart data={data} />
        <TodoList 
          data={data}
          classes={classes}
          loading={loading} 
          deleteTodo={deleteTodo}/>
      </div>
    </>
  )
}

export default Dashboard;
