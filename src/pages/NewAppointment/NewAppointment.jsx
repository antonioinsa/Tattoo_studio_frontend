import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./NewAppointment.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { createAppointment } from "../../services/apiCalls"
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import dayjs from "dayjs";


export const NewAppointment = () => {
  const rdxCredentials = useSelector(userData);
  const token = rdxCredentials.credentials;
  const role = rdxCredentials.role
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('')
  const [messageError, setMsgError] = useState('')

  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    article: ''
  })

  const [appointmentError, setAppointmentError] = useState({
    dateError: '',
    timeError: '',
    articleError: ''
  })

  useEffect(() => {

    if (!token && !role === 'user') {
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
    let error = validator(e.target.name, e.target.value)
    setAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const newAppointmentClient = () => {
    try {
      const combinedDateTime = `${appointment.date}T${appointment.time}:00.000Z`
      const dateBody = dayjs(combinedDateTime)

      const formattedDate = dateBody.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")

      const body = {
        date: formattedDate,
        article: appointment.article
      }

      createAppointment(token, body)
      setSuccessMessage('Created Appointment')
      setTimeout(() => {
        navigate("/profile")
      }, 500);


    } catch (error) {
      console.log(error)
      setMsgError(error)
    }
  }

  return (
    <div className="allView">
      <div className="createAppointmentDesign">
        <CustomInput
          design="inputDesign"
          type="date"
          name="date"
          placeholder="Appointment Date"
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.timeError}</div>
        <CustomInput
          design="inputDesign"
          type="time"
          name="time"
          placeholder="Time Date"
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.timeError}</div>
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
        <div className='buttonSubmit' onClick={newAppointmentClient}>Create appointment</div>
        {successMessage && <div className='successMsg'>{successMessage}</div>}
        {messageError && <div className='successMsg'>{messageError}</div>}
      </div>
    </div>
  );
};
