import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { dataClient, updateClient } from "../../services/apiCalls";
import { Link } from "react-router-dom";

export const Profile = () => {

  const navigate = useNavigate()
  const datosRdxUser = useSelector(userData)
  const token = datosRdxUser.credentials



  //const passwordToDecode = datosRdxUser.credentials.password
  //const decodedPassword = bcrypt.hashSync(passwordToDecode, 10)
  //  console.log("Password decodificado:", decodedPassword)
  //}
  //if (!bcrypt.compareSync(password, worker.password)) {
  //  return res.status(401).json
  //      ({
  //          success: true,
  //          message: "Worker or password incorrect"
  //      })
  //}

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


  const updateProfile = async () => {
    try {
      const body = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        //password: profile.password
      };

      const response = await updateClient(token, body);

      setProfile(response.data.data);
      setIsEnabled(true);

      // mensaje de OK
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      // manejar errores, mostrar mensajes de error
    }
  };

  const cancelEdit = async () => {
    setIsEnabled(true)
    try {
      const response = await dataClient(token);
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
          design={`inputDesign ${profileError.phoneError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"phone"}
          placeholder={""}
          value={profile.phone}
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
                <div className="sendDesign" onClick={() => updateProfile()}>Send</div>
              </>
            )
        }
      </div>
      <div className="manageAppointmentDesign">
        <iframe width="80%" height="26%" src="https://www.youtube.com/embed/l5Ed5ecTiUo?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
        <div>
          < Link to="/appointmenthistory">
            <div className="buttonAppointments">Appointment history</div>
          </Link>
          < Link to="/newappointment">
            <div className="buttonAppointments">New appointment</div>
          </Link>
        </div>
      </div>
    </div>
  )
}