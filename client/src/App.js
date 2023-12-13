import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
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
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
  root: {
    width:'100%',
    minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: '20px'
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function App() {
  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const stateRefresh = () => {
    setCustomers("");
    setCompleted(0);
    setSearchKeyword("");
    callApi().then(res => { setCustomers(res);}).catch(err => console.log(err));
  }

  const handleValueChange = (event) => {
    setSearchKeyword(event.target.value);
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return <Customer stateRefresh={stateRefresh} key={c.id} id={c.id} name={c.name} image={c.image} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>
    })
  }

  const classes = useStyles();
  const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];
  
  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              고객 관리 시스템
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색하기"
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={searchKeyword}
                onChange={handleValueChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={classes.menu}>
      <CustomerAdd stateRefresh={stateRefresh}></CustomerAdd>
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers ? filteredComponents(customers) :
                <TableRow>
                  <TableCell colSpan="6" align='center'>
                    <CircularProgress variant='indeterminate' value={completed} />
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      
    </div>
  );
}

export default App;
