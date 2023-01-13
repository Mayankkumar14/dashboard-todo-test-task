import React, { useCallback, useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Chip, 
  FormControl, 
  MenuItem, 
  OutlinedInput, 
  Select, 
  SvgIcon, 
  styled 
} from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createStyles, makeStyles } from '@mui/styles';

const MutiSelectRootDiv = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
})

const SelectedChipsDiv = styled('div')({
  display: 'flex',
  gap: '10px',
  overflow: 'hidden'
})

const StyledMenuItem = styled(MenuItem)({
  fontSize: 20
})

const useStyles = makeStyles((theme) =>
  createStyles({
    chartContainer: {
      width: '70%',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    multiSelectInput:{
      '& > div': {
        padding:'8px 14px'
      }
    }
  })
);

const barChartOptions = {
  plugins: {
    legend: {
      position: 'top',
      align: 'end'
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
      title: {
        display: true,
        text: 'Users',
        align: 'center',
        font: { size: 18 },
      }
    },
    y: {
      title: {
        display: true,
        text: 'No Of Tasks',
        align: 'center',
        font: { size: 18 },
      }
    }
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
)

export const BarChart = ({ data }) => {
  const classes = useStyles();
  const [dataset, setDataset] = useState([]);
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });

  const setChartData = useCallback((data) => {
    setBarChartData({
      labels: data?.map((data) => data.label),
      datasets: [
        {
          label: 'Completed Tasks',
          data: data.map((data) => data.completed),
          backgroundColor: '#120c8a'
        }
      ]
    })
  }, [])

  useEffect(() => {
    const usersGroup = data?.reduce((previous, current) => {
      previous[current.userId] = previous[current.userId] || [];
      previous[current.userId].push(current);
      return previous;
    }, {});

    let formattedData = []
    if (usersGroup) {
      for (const [key, value] of Object.entries(usersGroup)) {
        const completedGroup = value?.reduce((previous, current) => {
          previous[current.completed] = previous[current.completed] || [];
          previous[current.completed].push(current);
          return previous;
        }, {});
        formattedData.push({ label: `User id: ${key}`, completed: completedGroup['true']?.length });
      }
    }

    setDataset(formattedData);
    setChartData(formattedData);
  }, [data, setChartData])

  return (
    <Card elevation={3} sx={{ marginBottom: 5 }} className={classes.chartContainer}>
      <CardContent sx={{ textAlign: 'left' }}>
        <div className="card-header">
          <h1>Bar Chart </h1>
          <MultiSelect dataset={dataset} setChartData={setChartData} />
        </div>
        <ChartContainer>
          <Bar options={barChartOptions} data={barChartData} height={70} />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const ChartContainer = styled('div')(() => ({
  maxWidth: '100%',
  margin: 'auto'
}))

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
}

const ALL_USERS = 'All Users'

const MultiSelect = ({ dataset, setChartData }) => {
  const classes = useStyles();
  const [userNames, setUserNames] = useState([])
  const [selectedUserNames, setSelectedUserNames] = useState([ALL_USERS])

  useEffect(() => {
    const names = []
    dataset.forEach(data => names.push(data.label))
    setUserNames(names)
  }, [dataset])

  const filterData = (selectedNames) => {
    if (selectedNames.length === 0) {
      return setChartData(dataset)
    }
    const filteredData = dataset.filter(value => selectedNames.includes(value.label))
    setChartData(filteredData)
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    const names = typeof value === 'string' ? value.split(',') : value
    const index = names.indexOf(ALL_USERS)
    if (index > -1) names.splice(index, 1)
    if (names.length === 0) setSelectedUserNames([ALL_USERS])
    else setSelectedUserNames(names)
    filterData(names)
  }

  const handleDelete = (event, value) => {
    event.preventDefault()
    const newNames = selectedUserNames.filter(name => name !== value)
    if (newNames.length === 0) setSelectedUserNames([ALL_USERS])
    else setSelectedUserNames(newNames)
    filterData(newNames)
  }
  return (
    <MutiSelectRootDiv>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          id='multi-select'
          multiple
          value={selectedUserNames}
          onChange={handleChange}
          input={<OutlinedInput className={classes.multiSelectInput}/>}
          renderValue={(selected) => (
            <SelectedChipsDiv>
              {selected.map((value) => (
                <Chip
                  label={value}
                  key={value}
                  clickable
                  deleteIcon={
                    <SvgIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                    </SvgIcon>
                  }
                  onDelete={(event) => handleDelete(event, value)}
                />
              ))}
            </SelectedChipsDiv>
          )}
          MenuProps={MenuProps}
        >
          {userNames.map((username) => (
            <StyledMenuItem
              key={username}
              value={username}
              className={selectedUserNames.indexOf(username) === -1 ? 'not-selected' : 'selected'}
            >
              {username}
            </StyledMenuItem>
          ))}
        </Select>
      </FormControl>
    </MutiSelectRootDiv>
  )
}
