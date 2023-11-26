import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./NewAppointment.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { createAppointment } from "../../services/apiCalls"
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { DateTimePicker } from "@mantine/dates";

export const NewAppointment = () => {
  const rdxCredentials = useSelector(userData);
  const token = rdxCredentials.credentials.token;
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    date: '',
    article: ''
  });

  const [appointmentError, setAppointmentError] = useState({
    dateError: '',
    articleError: ''
  });

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [rdxCredentials])

  const functionHandler = (e) => {
    setAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = validator(e.target.name, e.target.value);
    setAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const [message, setMessage] = useState('');

  const Submit = () => {
    if (!appointmentError.dateError && !appointmentError.articleError) {
      createAppointment(token, appointment)
        .then((result) => {
          const { message } = result;
          setMessage(message);
          createAppointment();
        })
        .catch((error) => {
          console.error('Error al crear la cita:', error);
        });
    }
  };
  console.log(appointment);
  return (
    <div className="allView">
      <div className="createAppointmentDesign">
        <DateTimePicker
          design={`inputDesign ${appointmentError.articleError !== "" ? 'inputDesignError' : ''}`}
          valueFormat={"DD MMM YYYY hh:mm A"}
          functionProp={functionHandler}
          label={""}
          placeholder={"Pick date and time"}
        />
        <div className='errorMsg'>{appointmentError.dateError}</div>
        <CustomInput
          design={`inputDesign ${appointmentError.articleError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"article"}
          placeholder={"Article number"}
          value={appointment.article}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.articleError}</div>
        <div className='buttonSubmit' onClick={Submit}>Create appointment</div>
        {message && <div className='successMsg'>{message}</div>}
      </div>
    </div>
  );
};
