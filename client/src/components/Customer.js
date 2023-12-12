import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CustomerDelete from "./CustomerDelete";



function Customer(props) {
  return (
    // JSX는 두 개 이상의 태그들이 나열되어있으면 무조건 div로 묶어야한다.
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell><img src={props.image} alt="profile" /></TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.birthday}</TableCell>
      <TableCell>{props.gender}</TableCell>
      <TableCell>{props.job}</TableCell>
      <TableCell><CustomerDelete stateRefresh={props.stateRefresh} id={props.id}></CustomerDelete></TableCell>
    </TableRow>
  );
}


export default Customer;