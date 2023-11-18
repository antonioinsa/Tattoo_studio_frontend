
import React, { useState, useEffect } from "react";
import "./WorkerProfile.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { setPrice } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const WorkerProfile = () => {

    const navigate = useNavigate()
    const datosRdxUser = useSelector(userData)
    const token = datosRdxUser.credentials

    const [profile, setProfile] = useState({
        id: datosRdxUser.credentials.id,
        price: datosRdxUser.credentials.price
    })

    const [profileError, setProfileError] = useState({
        idError: '',
        priceError: ''
    });


    useEffect(() => {

        if (!datosRdxUser.credentials) {
            navigate("/")
        }
    }, [datosRdxUser])

    const errorCheck = (e) => {

        let error = ""

        error = validator(e.target.name, e.target.value)

        setProfileError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const functionHandler = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const addPriceById = () => {
        const updatePrice = async () => {
            try {
                const response = await setPrice(token, profile)
                console.log('Respuesta del servidor:', response.data.data)
                setProfile(response.data.data)
            } catch (error) {
                console.error('Error al obtener el perfil:', error)
            }
        }
        updatePrice()
        setTimeout(() => {
            setIsEnabled(true)
        }, 400)
    }

    return (
        <div className="tableProfileDesign">

            <div className="inputs">
                <CustomInput
                    design={`inputDesign ""}`}
                    type={"text"}
                    name={"id"}
                    placeholder={"Product"}
                    value={profile.id}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <CustomInput
                    design={`inputDesign ""}`}
                    type={"text"}
                    name={"price"}
                    placeholder={"Price"}
                    value={profile.price}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {
                    <div className="setPrice" onClick={() => addPriceById()}>Set price of product</div>
                }
            </div>
            <div className="appointmentDesign">
                <div className="tableAppointment">
                    <h2>Appointments</h2>
                    <div className="request"></div>
                </div>
            </div>

        </div>
    )
}