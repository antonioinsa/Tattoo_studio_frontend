import "./NewAppointment.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from "@mantine/dates";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { createAppointment, getAppointments } from "../../services/apiCalls";
import dayjs from "dayjs";
import { validator } from "../../services/useful";

export const NewAppointment = () => {
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    date: '',
    article: ''
  });

  const [appointmentError, setAppointmentError] = useState({
    dateError: '',
    articleError: ''
  });

  const [appointmentsList, setAppointmentsList] = useState([]);

  useEffect(() => {
    // Cargar las citas cuando el componente se monta
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const appointments = await getAppointments(); // Debes implementar la función que obtiene las citas desde tu servicio
      setAppointmentsList(appointments);
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  };

  const functionHandler = (e) => {
    const value = e.target.value;
    const dateValue = e.target.name === 'date' ? dayjs(value) : value;

    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [e.target.name]: dateValue,
    }));
  };

  const errorCheck = (e) => {
    let error = validator(e.target.name, e.target.value)
    if (e.target.name === 'date') {
      error = validator('date', appointment.date)
    }

    setAppointmentError((prevErrors) => ({
      ...prevErrors,
      [e.target.name + 'Error']: error,
    }))
  }

  const handlerSubmit = () => {
    for (const key in appointment) {
      if (appointment[key].trim() === '') {
        setAppointmentError((prevErrors) => ({
          ...prevErrors,
          [key + 'Error']: `${key.charAt(0).toUpperCase() + key.slice(1)} es requerido`,
        }));
        return;
      }
    }

    // Puedes enviar la solicitud al servidor para registrar la cita
    createAppointment(appointment)
      .then(() => {
        console.log('Cita registrada exitosamente');
        // Puedes navegar a otra página o realizar otras acciones después de registrar la cita
        navigate("/profile");
        // Actualizar la lista de citas después de crear una nueva
        loadAppointments();
      })
      .catch((error) => {
        console.error('Error al registrar la cita:', error);
        // Puedes manejar el error de acuerdo a tus necesidades
      });
  };

  return (
    <div className="allView">
      <div className="createAppointmentDesign">
        <div className="datePicker">
          <DateTimePicker
            design={`inputDesign ${appointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
            type={"datetime"}
            name={"date"}
            placeholder={"Select date"}
            value={appointment.date}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div className='errorMsg'>{appointmentError.dateError}</div>
        </div>
        <div className="customInput">
          <CustomInput
            
            design={`inputDesign ${appointmentError.articleError !== "" ? 'inputDesignError' : ''}`}
            type={"text"}
            name={"article"}
            placeholder={"Article"}
            value={appointment.article}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div className='errorMsg'>{appointmentError.articleError}</div>
        </div>
        <div className='buttonSubmit' onClick={handlerSubmit}>Create appointment</div>
      </div>
      <div className="ourAppointments">
        <h2>Our Appointments</h2>
        <ul>
          {appointmentsList.slice(0, 10).map((apt) => (
            <li key={apt.id}>{`Date: ${apt.date}, Article: ${apt.article}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
