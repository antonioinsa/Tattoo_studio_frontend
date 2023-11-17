import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { dataClient } from "../../services/apiCalls";

export const Profile = () => {

  const navigate = useNavigate()

  const datosRdxUser = useSelector(userData)
  //console.log(datosRdxUser);
  const token = datosRdxUser.credentials


  const [profile, setProfile] = useState({
    first_name: datosRdxUser.credentials.first_name,
    last_name: datosRdxUser.credentials.last_name,
    email: datosRdxUser.credentials.email,
    phone: datosRdxUser.credentials.phone,
    password: datosRdxUser.credentials.password
  })
  const [profileError, setProfileError] = useState({
    first_nameError: '',
    last_nameError: '',
    emailError: '',
    phoneError: '',
    password: ''
  });

  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await dataClient(token)
        console.log('Respuesta del servidor:', response.data.data)
        setProfile(response.data.data)
      } catch (error) {
        console.error('Error al obtener el perfil:', error)
      }
    }
    getProfile()
  }, [token])


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

  const sendData = () => {
    const getProfile = async () => {
      try {
        const response = await updateClient(token, profile)
        console.log('Respuesta del servidor:', response.data.data)
        setProfile(response.data.data)
      } catch (error) {
        console.error('Error al obtener el perfil:', error)
      }
    }
    getProfile()
    setTimeout(() => {
      setIsEnabled(true)
    }, 400)
  }

  const cancelEdit = async () => {
    setIsEnabled(true)
    try {
      const response = await dataClient(token);
      console.log('Respuesta del servidor:', response.data.data);
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  }

  return (
    <div className="tableProfile">
      <div className="profileDesign">
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.first_nameError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"first_name"}
          placeholder={""}
          value={profile.first_name}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.last_nameError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"last_name"}
          placeholder={""}
          value={profile.last_name}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.phoneError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"phone"}
          placeholder={""}
          value={profile.phone}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.emailError !== "" ? "inputDesignError" : ""
            }`}
          type={"email"}
          name={"email"}
          placeholder={""}
          value={profile.email}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.passwordError !== "" ? "inputDesignError" : ""
            }`}
          type={"password"}
          name={"password"}
          placeholder={""}
          value={profile.password}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        {
          isEnabled
            ? (
              <div className="editDesign" onClick={() => setIsEnabled(!isEnabled)}>Edit</div>
            ) :
            (
              <>
                <div className="cancelDesign" onClick={() => cancelEdit()}>Cancel</div>
                <div className="space"></div>
                <div className="sendDesign" onClick={() => sendData()}>Send</div>
              </>
            )
        }
      </div>
      <div className="manageAppointmentDesign">
        <iframe width="40%" height="20%" src="https://www.youtube.com/embed/l5Ed5ecTiUo?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
        <div>
        <div className="buttonAppointments">Appointment history</div>
        <div className="buttonAppointments">New appointment</div>
        </div>
      </div>
    </div>
  )
}