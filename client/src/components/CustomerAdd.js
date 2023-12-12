import React, { useState } from "react";
import post from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hidden: {
    display: 'none'
  }
})

function CustomerAdd(props) {
  const [state, setState] = useState({
    file: null,
    userName: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    open: false
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addCustomer()
      .then((res) => { 
        console.log(res.data);
        props.stateRefresh();
      });
    setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
      });
  }

  const handleFileChange = (event) => {
    let nextState = {...state};
    nextState.file = event.target.files[0];
    nextState.fileName = event.target.value;
    setState(nextState);
  }

  const handleValueChange = (event) => {
    let nextState = {...state};
    nextState[event.target.name] = event.target.value;
    setState(nextState);
  }

  const handleClickOpen = () => {
    let nextState = {...state};
    nextState.open = true;
    setState(nextState);
  }

  const handleClose = () => {
    setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    });
  }

  function addCustomer() {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', state.file);
    formData.append('name', state.userName);
    formData.append('birthday', state.birthday);
    formData.append('gender', state.gender);
    formData.append('job', state.job);
    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    }
    return post.post(url, formData, config);
  }


  const classes = useStyles();
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={state.open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={state.file} value={state.fileName} onChange={handleFileChange}></input><br/>
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span" name="file">
              {state.fileName === "" ? "프로필 이미지 선택" : state.fileName}
            </Button>
          </label>
          <br/>
          <TextField label="이름" type="text" name="userName" value={state.userName} onChange={handleValueChange}></TextField><br />
          <TextField label="생년월일" type="text" name="birthday" value={state.birthday} onChange={handleValueChange}></TextField><br />
          <TextField label="성별" type="text" name="gender" value={state.gender} onChange={handleValueChange}></TextField><br />
          <TextField label="직업" type="text" name="job" value={state.job} onChange={handleValueChange}></TextField><br />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerAdd;