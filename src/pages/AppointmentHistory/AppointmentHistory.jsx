import "./AppointmentHistory.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { clientAppointment } from "../../services/apiCalls";

export const AppointmentHistory = () => {
    const navigate = useNavigate();
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials;

    useEffect(() => {
        if (!datosRdxUser.credentials) {
            navigate("/");
        }
    }, [datosRdxUser, navigate]);

    const [appointments, setAppointments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clientAppointment(token);
                if (response.data.success) {
                    const sortedAppointments = response.data.appointments.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));
                    setAppointments(sortedAppointments);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error.response.data.message);
            }
        };

        fetchData();
    }, [token]);

    const showNextAppointments = () => {
        const nextIndex = currentIndex + 2;
        if (nextIndex < appointments.length) {
            setCurrentIndex(nextIndex);
        }
    };

    const showPreviousAppointments = () => {
        const prevIndex = currentIndex - 2;
        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
        }
    };

    return (
        <div className="tableAppointmentDesign">
            {appointments.slice(currentIndex, currentIndex + 2).map((appointment, index) => (
                <div key={index} className={`appointmentRow ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <p className="name">Tattoo artist: {appointment.tattoo_artist}</p>
                    <p>Intervention tipe: {appointment.type}</p>
                    <p>Price: {appointment.price}</p>
                    <p>Appointment date: {appointment.appointment_date}</p>
                    <p>Description: {appointment.description}</p>
                    <p>Article: {appointment.article}</p>
                </div>
            ))}
            <div className="navigationButtons">
                <button onClick={showPreviousAppointments}
                    disabled={appointments.length <= 2 || currentIndex === 0}>Previus</button>

                <button onClick={showNextAppointments}
                    disabled={appointments.length <= 2 || currentIndex + 2 >= appointments.length}>Next</button>
            </div>
        </div>
    );
}
