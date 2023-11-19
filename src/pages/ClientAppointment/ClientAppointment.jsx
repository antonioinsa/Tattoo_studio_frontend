import React, { useState, useEffect } from "react";
import "./ClientAppointment.css";
import { useSelector } from "react-redux";
import { clientAppointment } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const ClientAppointment = () => {
  const datosRdxUser = useSelector(userData);
  const token = datosRdxUser.credentials;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await clientAppointment(token);
        //console.log(response.data);

        if (response.data.success) {
          // Si la llamada fue exitosa, actualiza el estado con las citas
          setAppointments(response.data.appointments);
        } else {
          // Maneja el caso en el que no hay citas o hay un error
          console.error('Error al obtener las citas:', response.data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
        setLoading(false);
      }
    };

    getAppointments();
  }, [token]);

  return (
    <div className="datingDesign">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <p>Tattoo Artist: {appointment.tattoo_artist}</p>
              <p>Type: {appointment.type}</p>
              <p>Price: {appointment.price}</p>
              <p>Appointment Date: {appointment.appointment_date}</p>
              <p>Description: {appointment.description}</p>
              <p>Article: {appointment.article}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
