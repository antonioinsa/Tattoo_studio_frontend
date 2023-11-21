import React, { useState, useEffect } from "react";
import "./WorkerProfile.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { setPrice, workerAppointment } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const WorkerProfile = () => {
    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials;

    const [errorMessage, setErrorMessage] = useState(null)

    const [profile, setProfile] = useState({
        id: "",
        price: ""
    })

    const [profileError, setProfileError] = useState({
        idError: '',
        priceError: ''
    })

    //const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (!datosRdxUser.credentials) {
            navigate("/")
        }
    }, [datosRdxUser, navigate])

    const errorCheck = (e) => {
        let error = ""
        error = validator(e.target.name, e.target.value)

        setProfileError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const [editable, setEditable] = useState(false)

    const setPrice = (e) => {
        setEditable(e.target.checked)
    }

        const addPriceById = async () => {
            try {
                const response = await setPrice(token, profile.id, { price: profile.price })
                setProfile(response.data.data)
                console.log(response.data.message);
            } catch (error) {

                setErrorMessage(error.response.data.message)
            }
            //setTimeout(() => {
            //    setIsEnabled(true);
            //}, 400);

        };
    
    const [appointments, setAppointments] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    console.log(appointments);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await workerAppointment(token)
                if (response.data.success) {
                    setAppointments(response.data.appointments)
                } else {
                    console.error('Error al obtener las citas:', response.data.message)
                }
            } catch (error) {
                console.error('Error al obtener las citas:', error)
            }
        };

        fetchData()
    }, [token])

    const showNextAppointment = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % appointments.length)
    };

    const showPreviousAppointment = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + appointments.length) % appointments.length)
    };

    return (
        <div className="tableProfileDesign">
            <div className="inputs">
                <CustomInput
                    design="inputDesign"
                    type="text"
                    name="id"
                    placeholder="Id"
                    value={profile.id}
                    onChange={setPrice}
                    onBlur={errorCheck}
                />
                <CustomInput
                    design="inputDesign"
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={profile.price}
                    onChange={setPrice}
                    onBlur={errorCheck}
                />
                <div className="setPrice" onClick={addPriceById}>Set price of product</div>
                {errorMessage && (<div className="error-message">{errorMessage}</div>)}
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
                    <div className="navigationButtons">
                        <button onClick={showPreviousAppointment}
                            disabled={appointments.length <= 1 ||
                                currentIndex === 0}>Previous</button>

                        <button onClick={showNextAppointment}
                            disabled={appointments.length <= 1 ||
                                currentIndex === appointments.length - 1}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}