import Customer from './components/Customer';
import './App.css';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';

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

const cus = [{
  'id': 1,
  'image': 'https://picsum.photos/id/10/64/64',
  'name': '홍길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://picsum.photos/id/20/64/64',
  'name': '양신희',
  'birthday': '001222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 3,
  'image': 'https://picsum.photos/id/30/64/64',
  'name': '권준석',
  'birthday': '051222',
  'gender': '남자',
  'job': '대학생'
}]

function App(props) {
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
            cus.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>); })
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
