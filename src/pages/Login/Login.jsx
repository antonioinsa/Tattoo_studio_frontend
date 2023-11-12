import React, { useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logClient, logWorker } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { ChoiceSwitch } from "../../common/inputSwitch/Input ";
import { Link } from 'react-router-dom';


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

    const [checked, setChecked] = useState(false)

    const functionHandler = (e) => {
        setAuth((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const switchHandler = (e) => {
        setChecked(e.target.checked)
    }

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

        if (!checked) {

            logClient(auth)
                .then(
                    (response) => {
                        console.log(response);

                        if (response.error) {
                            setError("Invalid Email or Password")
                        } else {
                            localStorage.setItem("token", response.data.token)

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
        } else {

            logWorker(auth)
                .then(
                    (response) => {
                        console.log(response);

                        if (response.error) {
                            setError("Invalid Email or Password")
                        } else {
                            localStorage.setItem("token", response.data.token)

                            setTimeout(() => {
                                navigate("/worker");

                            }, 500);
                        }
                    }
                )
                .catch((error) => {
                    console.log(error);
                    setError("Invalid Email or Password");

                });
        }
    }

    return (
        <div className="global">
            <div>
                <div className="loginDesign">
                    <div className="checked">
                        <ChoiceSwitch
                            checked={checked}
                            onChange={switchHandler}
                        />
                    </div>
                    <div className="space"></div>
                    <CustomInput
                        design={`inputDesign ${authError.emailError !== "" ? 'inputDesignError' : ''}`}
                        type={"email"}
                        name={"email"}
                        placeholder={"EMAIL"}
                        //value={auth.email}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{authError.emailError}</div>
                    <CustomInput
                        design={`inputDesign ${authError.passwordError !== "" ? 'inputDesignError' : ''}`}
                        type={"password"}
                        name={"password"}
                        placeholder={"PASSWORD"}
                        //value={auth.password}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{authError.passwordError}</div>
                    <div className='registerButton'>
                        <Link to="/register">Register</Link>
                    </div>
                    <div className='buttonSubmit' onClick={Submit}>Login</div>
                    <div className='errorMsg'>{error}</div>
                </div>
            </div>
        </div>

    );
};
