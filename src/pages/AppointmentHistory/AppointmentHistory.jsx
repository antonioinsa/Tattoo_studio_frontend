import "./AppointmentHistory.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { clientAppointment, deleteAppointment, updateAppointment } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const AppointmentHistory = () => {
    const navigate = useNavigate();
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials;

    const [appointments, setAppointments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!datosRdxUser.credentials) {
            navigate("/");
        }
    }, [datosRdxUser, navigate]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clientAppointment(token);
                if (response.data.success) {
                    const sortedAppointments = response.data.appointments.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));
                    setAppointments(sortedAppointments);
                    console.log(response.data.appointments);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error.response.data.message);
            }
        }

        fetchData();
    }, [token]);

    const showNextAppointments = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex < appointments.length) {
            setCurrentIndex(nextIndex);
        }
    }

    const showPreviousAppointments = () => {
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
        }
    }

    const deleteCurrentAppointment = async () => {
        try {
            const appointmentIdToDelete = parseInt()
            const response = await deleteAppointment({ id: appointmentIdToDelete, token });
            if (response.data.success) {

                const updatedAppointments = [...appointments];
                updatedAppointments.splice(currentIndex, 1);
                setAppointments(updatedAppointments);

                if (currentIndex >= updatedAppointments.length) {
                    setCurrentIndex(updatedAppointments.length - 1);
                }
            } else {
                console.error(response.data.message)
                setErrorMessage(response.data.message)
            }
        } catch (error) {
            console.error(error.response.data.message)
            setErrorMessage(error.response.data.message)
        }
    }

    const updateDate = async () => {
        try {
            const dateToUpdate = appointments[currentIndex].appointment_date

            const body = {
                date: dateToUpdate,
            }
            console.log(body);
            const response = await updateAppointment(token, body)

            setAppointments(prevAppointments => {
                const updatedAppointments = prevAppointments.map(appointment =>
                    appointment.id === profile.id ? { ...appointment, price: profile.price } : appointment
                )

                return updatedAppointments
            })

            setSuccessMessage('Price updated successfully')
            setErrorMessage(null)
        } catch (error) {
            console.error('Error updating price:', error)
            setErrorMessage('Error updating price or ID not found. Please try again')

        }
    }

    return (
        <>
            <div className="appointmentClientSpaceDesign">
                <div className="modifyAppointmentDesign">
                    <div className="auxiliarButtons">
                        <div className="auxOne" onClick={updateDate} >Update Appointment</div>
                        <div>
                            <CustomInput
                                disabled={false}
                                design="inputDesign"
                                type="date"
                                name="date"
                                placeholder="Appointment Date"
                            //functionProp={functionHandler}
                            //functionBlur={errorCheck}
                            />
                        </div>
                        <div><input type="text" className="deleteId" ></input></div>
                        <div className="auxTwo" onClick={deleteCurrentAppointment}>Delete Appointment</div>
                        <div className='errorMsg'>{errorMessage}</div>
                    </div>
                </div>
                <div className="tableAppointmentDesign">
                    {appointments.slice(currentIndex, currentIndex + 1).map((appointment, index) => (
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
                            disabled={appointments.length <= 1 || currentIndex === 0}>Previus</button>

                        <button onClick={showNextAppointments}
                            disabled={appointments.length <= 1 || currentIndex + 1 >= appointments.length}>Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
