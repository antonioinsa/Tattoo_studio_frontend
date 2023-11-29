import React, { useState, useEffect } from "react";
import "./AllAppointments.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { allAppointments } from "../../services/apiCalls";
import { Link } from "react-router-dom";

export const AllAppointments = () => {
    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials
    const role = datosRdxUser.role

    useEffect(() => {

        if (!token && !role === 'superAdmin') {
          navigate("/")
        }
      }, [datosRdxUser])

    const [allAppointmentsList, setAllAppointmentsList] = useState([])

    useEffect(() => {
        if (datosRdxUser.role === 'superAdmin') {
            const getAllAppointments = async () => {
                try {
                    const response = await allAppointments(token)
                    setAllAppointmentsList(response.data.appointments)
                } catch (error) {
                    console.error('Error al obtener el perfil:', error)
                }
            };
            getAllAppointments()

        }
    }, [datosRdxUser.role])

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="appointmentsDesign">
            <div className="viewAllAppointments">
                {allAppointmentsList.map((appointments, index) => (
                    <div key={appointments.id} className="appointmentItem">
                        <div className="lineOne">
                            <div>
                                <span>Worker_first_name: </span>
                                <span>{appointments.worker_first_name}</span>
                            </div>
                            <div>
                                <span>Worker_last_name: </span>
                                <span>{appointments.worker_last_name}</span>
                            </div>
                            <div>
                                <span>Client_first_name: </span>
                                <span>{appointments.client_first_name}</span>
                            </div>
                            <div>
                                <span>Client_last_name: </span>
                                <span>{appointments.client_last_name}</span>
                            </div>
                            <div>
                                <span>Price: </span>
                                <span>{appointments.price}</span>
                            </div>
                            <div>
                                <span>Article: </span>
                                <span>{appointments.article}</span>
                            </div>
                            <div>
                                <span>Type: </span>
                                <span>{appointments.type}</span>
                            </div>
                            <div>
                                <span>Description: </span>
                                <span>{appointments.description}</span>
                            </div>
                        </div>
                        <div>
                            <span>Appointment_date: </span>
                            <span>{appointments.appointment_date}</span>
                        </div>
                        <div>
                            <span>Last_updated: </span>
                            <span>{appointments.last_updated}</span>
                        </div>
                        <div className="line">
                            <div>
                                <span>Id_appointment: </span>
                                <span>{appointments.id_appointment}</span>
                            </div>
                        </div>
                        {index < allAppointmentsList.length - 1 && <div className="Line"></div>}
                    </div>
                ))}
            </div>
            <button className="goTopButton" onClick={goToTop}>Go top</button>
            <Link to='/administration'>
                <div className="goToSuperAdmin">Go to SuperAdmin</div>
            </Link>
        </div>
    )

}
