import "./AppointmentHistory.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { clientAppointment, deleteAppointment, updateAppointment } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import dayjs from "dayjs";

export const AppointmentHistory = () => {
    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials
    const role = datosRdxUser.role


    const [appointments, setAppointments] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [msgError, setMsgError] = useState('')

    useEffect(() => {

        if (!token && !role === 'user') {
            navigate("/")
        }
    }, [datosRdxUser])


    const [editDate, setEditDate] = useState({
        id: '',
        date: ''
    })

    const [editDateError, setEditDateError] = useState({
        idError: '',
        dateError: ''
    })

    const functionHandler = (e) => {
        setEditDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const errorCheck = (e) => {

        let error = ""

        error = validator(e.target.name, e.target.value)

        setEditDateError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clientAppointment(token)
                if (response.data.success) {
                    const sortedAppointments = response.data.appointments.sort((a, b) =>
                        new Date(b.appointment_date) - new Date(a.appointment_date))
                    setAppointments(sortedAppointments)
                }
            } catch (error) {
                console.log(error)
                setMsgError(error.message)
            }
        }

        fetchData()
    }, [])

    const showNextAppointments = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex < appointments.length) {
            setCurrentIndex(nextIndex)
        }
    }

    const showPreviousAppointments = () => {
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex)
        }
    }

    const deleteIdAppointment = async () => {
        try {
            console.log(token);
            const id = { id: editDate.id }
            const body = parseInt(id)
            const response = await deleteAppointment(token, body)

            if (response.data.success) {
                setAppointments(prevAppointments =>
                    prevAppointments.filter(appointment => appointment.id !== appointmentIdToDelete)
                )
            }

        } catch (error) {
            console.log(error)
            setMsgError(error.message)
        }
    }

    const updateDate = async () => {
        try {
            const dateBody = dayjs(editDate.date, "'{AAAA} MM-DDTHH:mm:ss SSS [Z] A'");
            const body = {
                id: editDate.id,
                date: dateBody
            }

            const response = await updateAppointment(token, body)

            if (response.data.success) {
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment.id === editDate.id ? { ...appointment, date: editDate.date } : appointment
                    )
                )
            }

        } catch (error) {
            console.log(error)
            setMsgError(error.message)
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
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                            />
                            <CustomInput
                                disabled={false}
                                design="inputDesign"
                                type="text"
                                name="id"
                                placeholder="Id"
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                            />
                        </div>
                        <div className="auxTwo" onClick={deleteIdAppointment}>Delete Appointment</div>
                        <div className='errorMsg'>{msgError}</div>
                    </div>
                </div>
                <div className="tableAppointmentDesign">
                    {appointments.slice(currentIndex, currentIndex + 1).map((appointment, index) => (
                        <div key={index} className={`appointmentRow ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            <p className="name">Tattoo artist: {appointment.tattoo_artist}</p>
                            <p>Id: {appointment.id}</p>
                            <p>Intervention tipe: {appointment.type}</p>
                            <p>Price: {appointment.price}</p>
                            <p>Appointment date: {appointment.appointment_date}</p>
                            <p>Description: {appointment.description}</p>
                            {/* <p>Article: {appointment.article}</p> */}
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
    )
}
