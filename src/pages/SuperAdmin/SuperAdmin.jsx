import React, { useState, useEffect } from "react";
import "./SuperAdmin.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { allClients } from "../../services/apiCalls";
//import { CustomInput } from "../../common/CustomInput/CustomInput";
//import { validator } from "../../services/useful";


export const SuperAdmin = () => {

    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials

    const [events, setEvents] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {

        if (!datosRdxUser.credentials) {
            navigate("/")
        }
    }, [datosRdxUser])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allClients(token)
                if (response.data.success) {
                    setEvents(response.data.events)
                } else {
                    console.error(response.data.message)
                }
            } catch (error) {
                console.error('Error fetching events', error)
            }
        }

        fetchData()
    }, [token])

    const showNextEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 4) % events.length)
    }

    const showPreviousEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 4 + events.length) % events.length)
    }

    return (
        <div className="superAdminDesign">
            <div className="optionsDesign">
                <div className="superAdmin"><h2>SuperAdmin Account</h2></div>
                <div className="buttonsDesign">
                    <div className='buttonSa'><Link to="/allclients">All Clients</Link></div>
                    <div className='buttonSa'><Link to="/appointmentsavailable">Appointments available</Link></div>
                    <div className='buttonSa'><Link to="/editAppointment">Edit appointment</Link></div>
                    <div className='buttonSa'><Link to="/deleteAppointment">Delete appointment</Link></div>
                </div>
                <div className="tableInfoDesign">
                    {events.length > 0 ? (
                        <div>
                            <p>Id: {events[currentIndex].id}</p>
                            <p>First Name: {events[currentIndex].first_name}</p>
                            <p>Last Name: {events[currentIndex].last_name}</p>
                            <p>Email: {events[currentIndex].email}</p>
                            <p>Phone: {events[currentIndex].phone}</p>
                            <p>Role: {events[currentIndex].role}</p>
                            <p>is_active: {events[currentIndex].is_active}</p>
                            <p>Update: {events[currentIndex].updated_at}</p>
                        </div>
                    ) : (
                        <p>No event available</p>
                    )}
                </div>
                <div className="showButtons">
                    <button
                        onClick={showPreviousEvent}
                        disabled={events.length <= 4 || currentIndex === 0}
                    >Previous
                    </button>
                    <button
                        onClick={showNextEvent}
                        disabled={
                            events.length <= 4 || currentIndex === events.length - 4
                        }
                    >Next
                    </button>
                </div>
            </div>
        </div>
    )
}
