import { render } from "@testing-library/react";
import React from "react";

function Customer(props) {
  return (
    // JSX는 두 개 이상의 태그들이 나열되어있으면 무조건 div로 묶어야한다.
    <div> 
      <CustomerProfile
      id={props.id}
      image={props.image}
      name={props.name}></CustomerProfile>
      <CustomerInfo
      birthday={props.birthday}
      gender={props.gender}
      job={props.job}></CustomerInfo>
    </div>
  );
}

function CustomerProfile(props) {
  return(
    <div>
      <img src={props.image} alt="profile" />
      <h2>{props.name}({props.id})</h2>
    </div>
  );
}

function CustomerInfo(props) {
  return (
    <div>
      <p>{props.birthday}</p>
      <p>{props.gender}</p>
      <p>{props.job}</p>
    </div>
  );
}

export default Customer;