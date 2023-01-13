# Please follow the below steps to run the application:
- npm i
- npm start

# Please have a look at the notes below:
- In this task, `chart.js` and `react-chartjs-2` libraries used for implementing the bar chart functionality.

- MaterialUI library used for UI.

- React context is used for managing the states.

# Funtionalities Implemented:

- Apart from suggested tasks, I have also implemented the `two mentioned bonus points` i.e implemented pagination and displayed the bar chart as per the user completed status.

- I have also implemented the `update, search and delete user funtionalities`. Here, for updating and removing the todo users data, we are directly modifying the local state because jsonplaceholder API does not support update and delete the actual todo API data. Here, we have implemented the respective update and delete API functionalities but for the state modification, we have used local todo user state. You can see the code in `state/index.js` file.

- I have also implemented the `caching functionality`. So data will be fetched only when data is not found in localstorage otherwise it would be fetched from localstorage.

- `Bar chart is updating in real time` whenever any updation happend in user's completed field. For example, If you change any user completed state to true or false, you will see the updation in completed count of respective user without refreshing the page.



