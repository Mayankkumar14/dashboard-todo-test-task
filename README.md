# Please follow the below steps to run the application:
- npm i
- npm start

# Please use below URL to test the app
https://genuine-otter-a37f5c.netlify.app

# Please have a look at the notes below:
- In this task, `chart.js` and `react-chartjs-2` libraries used for implementing the bar chart functionality.

- MaterialUI library used for UI.

- React context is used for managing the states.

# Funtionalities Implemented:

- Apart from suggested tasks, I have also implemented the `two mentioned bonus points` i.e implemented pagination and displayed the bar chart as per the user completed status.

- I have also implemented the `update, search and delete user funtionalities`. Here, for updating and removing the todo users data, we are directly modifying the local state because jsonplaceholder API does not provide updated result when we update or delete the record but we have implemented the CRUD operations on local state. You can see the respective code in `state/index.js` file.

- I have also implemented the `caching functionality`. So data will be fetched only when data is not found in localstorage otherwise it would be fetched from localstorage.

- `Bar chart is updating in real time` whenever any updation happend in user's completed field. For example, If you change any user completed state to true or false, you will see the updation in completed count of respective user without refreshing the page.

### Since it was a test task, I completed it according to the doc's instructions while also taking the deadline into consideration but IMO we can further improve the task:
- We can use scss styles to make more generic styles.
- We can integrate Axios and create custom hook for calling an API.
- We can integrate react-query to further improve the `caching funtionality` and API calling.
- Here, we can also use the typescript for better type checking.
