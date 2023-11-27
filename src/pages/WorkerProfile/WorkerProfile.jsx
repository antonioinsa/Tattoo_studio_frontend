import React, { useState, useEffect } from "react";
import "./WorkerProfile.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { setPrice, workerAppointment } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";

export const WorkerProfile = () => {
    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials

    const [appointments, setAppointments] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [msgError, setMsgError] = useState('')

    appointments.map(appointment => appointment.id)

    const [editAppointment, setEditAppointment] = useState({
        id: '',
        price: ''
    })

    const [editAppointmentError, setEditAppointmentError] = useState({
        id: '',
        price: ''
    })

    useEffect(() => {

        if (!datosRdxUser.credentials) {
            navigate("/")
        }
    }, [datosRdxUser])

    const errorCheck = (e) => {

        let error = ""

        error = validator(e.target.name, e.target.value)

        setEditAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const functionHandler = (e) => {
        setEditAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await workerAppointment(token)
                if (response.data.success) {
                    setAppointments(response.data.appointments)
                }
            } catch (error) {
                console.log(error);
                setMsgError(error.message);
            }
        }

        fetchData()
    }, [token, appointments])

    const updatePrice = async () => {
        try {
            const body = {
                id: editAppointment.id,
                price: editAppointment.price
            }

            await setPrice(token, body)

            setAppointments(prevAppointments => {
                const updatedAppointments = prevAppointments.map(appointment =>
                    appointment.id === editAppointment.id ? { ...appointment, price: editAppointment.price } : appointment
                )

                return updatedAppointments
            })

        } catch (error) {
            console.log(error);
            setMsgError(error.message);

        }
    }

    const showNextAppointment = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % appointments.length)
    }

    const showPreviousAppointment = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + appointments.length) % appointments.length)
    }

    return (
        <div className="tableProfileDesign">
            <div className="inputs">
                <CustomInput
                    disabled={false}
                    design="inputDesign"
                    type="text"
                    name="id"
                    placeholder="Id"
                    value={editAppointment.id}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <CustomInput
                    disabled={false}
                    design="inputDesign"
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={editAppointment.price}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className="setPrice" onClick={updatePrice}>Set price of product</div>
                <div className='MsgError'>{msgError}</div>
            </div>
            <div className="appointmentDesign">
                <div className="tableAppointment">
                    <h2 className="titleTable">Appointments</h2>
                    {appointments.length > 0 ? (
                        <div>
                            <br />
                            <p>Type: {appointments[currentIndex].type}</p>
                            <p className="inputsToEdit">Id: {appointments[currentIndex].id}</p>
                            <p className="inputsToEdit">Price: {appointments[currentIndex].price}</p>
                            <p>Client: {appointments[currentIndex].client}</p>
                            <p>Phone: {appointments[currentIndex].phone}</p>
                            <p>Appointment Date: {appointments[currentIndex].appointment_date}</p>
                            <p>Description: {appointments[currentIndex].description}</p>
                            <p>Article: {appointments[currentIndex].article}</p>
                            <br />
                        </div>
                    ) : (
                        <p>No appointments available</p>
                    )}
                </div>
                <div className="navigationButtons">
                    <button
                        onClick={showPreviousAppointment}
                        disabled={appointments.length <= 1 || currentIndex === 0}
                    >Previous
                    </button>
                    <button
                        onClick={showNextAppointment}
                        disabled={
                            appointments.length <= 1 || currentIndex === appointments.length - 1
                        }
                    >Next
                    </button>
                </div>
            </div>
        </div>
    )

}