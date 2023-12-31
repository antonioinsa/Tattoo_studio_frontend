import React, { useState } from "react";
import "./Register.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { registerClient } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";

export const Register = () => {

  const navigate = useNavigate();

  const [client, setClient] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: ''
  })

  const [clientError, setClientError] = useState({
    first_nameError: '',
    last_nameError: '',
    phoneError: '',
    emailError: '',
    passwordError: ''
  })


  const functionHandler = (e) => {
    setClient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const errorCheck = (e) => {

    let error = "";

    error = validator(e.target.name, e.target.value);

    setClientError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }

  const Submit = () => {

    for (let test1 in client) {
      if (client[test1] === "") {
        return;
      }

    }

    for (let test in clientError) {
      if (clientError[test] !== "") {
        return;
      }
    }

    registerClient(client)
      .then(
        setTimeout(() => {
          navigate("/login");
        }, 500)
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="global">
      <div className="registerDesign">
        <CustomInput
          disabled={false}
          design={`inputDesign ${clientError.first_nameError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"first_name"}
          placeholder={"First name"}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{clientError.first_nameError}</div>
        <CustomInput
          disabled={false}
          design={`inputDesign ${clientError.last_nameError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"last_name"}
          placeholder={"Last name"}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{clientError.last_nameError}</div>
        <CustomInput
          disabled={false}
          design={`inputDesign ${clientError.phoneError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"phone"}
          placeholder={"Phone"}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{clientError.phoneError}</div>
        <CustomInput
          disabled={false}
          design={`inputDesign ${clientError.emailError !== "" ? 'inputDesignError' : ''}`}
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{clientError.emailError}</div>
        <CustomInput
          disabled={false}
          design={`inputDesign ${clientError.passwordError !== "" ? 'inputDesignError' : ''}`}
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{clientError.passwordError}</div>
        <div className='buttonSubmit' onClick={Submit}>Submit</div>
      </div>
    </div>
  );
};
