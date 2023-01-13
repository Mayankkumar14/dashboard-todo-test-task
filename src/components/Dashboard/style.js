import { createStyles, makeStyles } from '@mui/styles'

export default makeStyles((theme) =>
  createStyles({
    dashboard: {
      padding: '50px 0'
    },
    paper: {
      width: '100%',
    },
    tableContainer: {
      width: '70%',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    tableHeader: {
      display: 'flex',
      padding: '0px 40px',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        padding: '20px 10px',
        '& h1': {
          display: 'none'
        },
      }
    },
    tableHeaderActions: {
      display: 'flex',
      width: '50%',
      gap: '30px',
      marginRight: '10px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        gap: '15px',
      }
    },
    tableHeading: {
      background: '#120c8a !important',
      color: 'white  !important',
    },
    selectBox: {
      width: '200px',
    }
  })
);
