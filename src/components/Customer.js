import { render } from "@testing-library/react";
import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';



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
    </TableRow>
  );
}


export default Customer;