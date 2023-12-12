import React from "react";

function CustomerDelete(props) {

  function deleteCustomer(id) {
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    props.stateRefresh();
  }

  return(
    <button onClick={(event) => {deleteCustomer(props.id)}}>삭제</button>
  );
}

export default CustomerDelete;