import React, { useState, useEffect } from "react";
import "./AllClients.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { allClients } from "../../services/apiCalls";
import { Link } from "react-router-dom";

export const AllClients = () => {
    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials
    const role = datosRdxUser.role

    useEffect(() => {

        if (!token && !role === 'superAdmin') {
            navigate("/")
        }
    }, [datosRdxUser])

    const [allClientsList, setAllClientsList] = useState([])

    useEffect(() => {
        if (datosRdxUser.role === 'superAdmin') {
            const getAllClients = async () => {
                try {
                    const response = await allClients(token)
                    setAllClientsList(response.data.data)
                } catch (error) {
                    console.error('Error al obtener el perfil:', error)
                }
            };
            getAllClients()
        }
    }, [datosRdxUser.role])

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="clientsDesign">
            <div className="viewAllClients">
                {allClientsList.map((client, index) => (
                    <div key={client.id} className="clientItem">
                        <div className="line1">
                            <div>
                                <span>First_name: </span>
                                <span>{client.first_name}</span>
                            </div>
                            <div>
                                <span>Id: </span>
                                <span>{client.id}</span>
                            </div>
                            <div>
                                <span>Last_name: </span>
                                <span>{client.last_name}</span>
                            </div>
                            <div>
                                <span>Role: </span>
                                <span>{client.role}</span>
                            </div>
                            <div>
                                <span>Email: </span>
                                <span>{client.email}</span>
                            </div>
                            <div>
                                <span>Phone: </span>
                                <span>{client.phone}</span>
                            </div>
                        </div>
                        <div className="line2">
                            <div>
                                <span>Last_updated: </span>
                                <span>{client.updated_at}</span>
                            </div>
                        </div>
                        {index < allClientsList.length - 1 && <div className="line"></div>}
                    </div>
                ))}
            </div>
            <Link to='/administration'>
                <div className="goToSuperAdmin">Go to SuperAdmin</div>
            </Link>
        </div>
    )

}
