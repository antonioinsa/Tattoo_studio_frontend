import React, { useState, useEffect } from "react";
import "./NewAppointment.css";
import { useSelector } from "react-redux";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from 'react-router-dom';
import { userData } from "../userSlice";

export const NewAppointment = () => {

  // const navigate = useNavigate();
  // const datosRdxUser = useSelector(userData)
  // const token = datosRdxUser.credentials

  // const [appointment, setAppointment] = useState({
    // date: '',
    // article: ''

  // })

  // const [appointmentError, setAppointmentError] = useState({
    // dateError: '',
    // articleError: ''

  // })

  // const [message, setMessage] = useState("");

  // useEffect(() => {
    // if (!token) {
      // navigate("/login");
    // }
  // }, []);

  // const functionHandler = (e) => {
    // setClient((prevState) => ({
      // ...prevState,
      // [e.target.name]: e.target.value,
    // }));
  // }

  // const errorCheck = (e) => {

    // let error = "";

    // error = validator(e.target.name, e.target.value);

    // setAppointmentError((prevState) => ({
      // ...prevState,
      // [e.target.name + 'Error']: error,
    // }));
  // }


  // const Create = () => {
    // if (appointment.date != "" &&
      // appointment.article != "")

      // console.log(token);
    // createAppointment(token)
      // .then((response) => {
        // console.log(response.data);
        // const { message, error } = response.data;
        // setMessage(message);
        // console.log(message);
        // if (message == "Appointment created successfully") {
          // setTimeout(() => {
            // navigate("/datinghistory");
          // }, 1000)
        // }
      // })
      // .catch(error => {
        // console.log(error);
      // });

  // } else {
    // setMessage("All fields are required")
// }
return (
  <div className="global">
    <div className="appointmentDesign">
      <CustomInput
        design={`inputDesign ${appointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
        type={"date"}
        name={"date"}
        placeholder={"Date"}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.dateError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.articleError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"article"}
        placeholder={"Article nº"}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{clientError.articleError}</div>

      <div className='buttonCreate' onClick={Create}>Create</div>
      <div>{message}</div>
    </div>
  </div>
)
}