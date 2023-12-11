import Customer from './components/Customer';
import './App.css';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';
import axios from "axios";
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    width:'100%',
    marginTop: '30px',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})


function App(props) {

  const [state, setState] = useState({
    customers: ""
  });

  async function callApi() {
    const res = await fetch('/api/customers');
    const newState = { ...state };
    newState.customers = await res.json();
    setState(newState);
  }

  useEffect(() => {
    callApi();
  });

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
            state.customers ? state.customers.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>)}) : ""
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
