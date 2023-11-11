import React, { useEffect, useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logClient } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";

export const Login = () => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState({
        email: "",
        password: "",
    })

    const [authError, setAuthError] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState("")

    const functionHandler = (e) => {
        setAuth((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    //   useEffect(()=>{
    //     console.log(credenciales);
    //   },[credenciales]);

    const errorCheck = (e) => {

        let error = "";

        error = validator(e.target.name, e.target.value);

        setAuthError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Submit = () => {

        for (let test1 in auth) {
            if (auth[test1] === "") {
                return;
            }

        }

        for (let test in authError) {
            if (authError[test] !== "") {
                return;
            }
        }

        logClient(auth)
            .then(
                (resultado) => {
                    console.log(resultado);

                    if (resultado.error) {
                        setError("Invalid Email or Password")
                    } else {
                        //Aqui guardaría el token........
                        //Una vez guardado el token....nos vamos a home....
                        setTimeout(() => {
                            navigate("/");
                        }, 500);
                    }
                }
            )
            .catch((error) => {
                console.log(error);
                    setError("Invalid Email or Password");
            });
    }

    return (
        <div className="global">
            <div>
                <div className="loginDesign">
                    <CustomInput
                        design={`inputDesign ${authError.emailError !== "" ? 'inputDesignError' : ''}`}
                        type={"email"}
                        name={"email"}
                        placeholder={""}
                        value={auth.email}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{authError.emailError}</div>
                    <CustomInput
                        design={`inputDesign ${authError.passwordError !== "" ? 'inputDesignError' : ''}`}
                        type={"password"}
                        name={"password"}
                        placeholder={""}
                        value={auth.password}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{authError.passwordError}</div>
                    <div className='buttonSubmit' onClick={Submit}>Login</div>
                    <div className='errorMsg'>{error}</div>
                </div>
            </div>
        </div>
    );
};
