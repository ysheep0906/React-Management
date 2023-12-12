import React, { useState } from "react";
import post from 'axios';

function CustomerAdd(props) {
  const [state, setState] = useState({
    file: null,
    userName: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: ''
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
        fileName: ''
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

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지: <input type="file" name="file" file={state.file} value={state.fileName} onChange={handleFileChange}></input><br/>
      이름: <input type="text" name="userName" value={state.userName} onChange={handleValueChange}></input><br/>
      생년월일: <input type="text" name="birthday" value={state.birthday} onChange={handleValueChange}></input><br/>
      성별: <input type="text" name="gender" value={state.gender} onChange={handleValueChange}></input><br/>
      직업: <input type="text" name="job" value={state.job} onChange={handleValueChange}></input><br/>
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;