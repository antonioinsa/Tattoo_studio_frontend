import React, { useEffect } from "react";
import "./SuperAdmin.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const SuperAdmin = () => {
    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)

    useEffect(() => {

        if (!datosRdxUser.credentials) {
            navigate("/")
        }
    }, [datosRdxUser])

    return (
        <div className="superAdminDesign">
            <h2>SuperAdmin</h2>
            <div className="buttonsDesign">
                <Link to="/allclients">
                    <div className="buttonSa">All Clients</div>
                </Link>
                <Link to="/allappointments">
                    <div className='buttonSa'>All Appointments</div>
                </Link>
            </div>
        </div>
    )
}
