import Customer from './components/Customer';
import './App.css';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    width:'100%',
    marginTop: '30px',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: '20px'
  }
})


function App() {
  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);

  const callApi= async () => {
    const res = await fetch('/api/customers');
    const body = await res.json();
    return body;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCompleted(completed >= 100 ? 0 : completed + 1);
    }, 20)
    callApi().then(res => { setCustomers(res);}).catch(err => console.log(err));
    return () => {
      clearInterval(timer);
    }
  }, []);

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생년월일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>
        </TableHead>
        <TableBody>
          {
            customers ? customers.map(c => {
               return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>)
              }) : 
              <TableRow>
                <TableCell colSpan="6" align='center'>
                  <CircularProgress variant='indeterminate' value={completed} />
                </TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
