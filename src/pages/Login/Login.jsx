import React, { useEffect, useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logClient, logWorker } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { ChoiceSwitch } from "../../common/inputSwitch/Input ";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";

export const Login = () => {

    const navigate = useNavigate();
    const rdxUserData = useSelector(userData)
    const dispatch = useDispatch();
    


    const [auth, setAuth] = useState({
        email: "",
        password: "",
    })

    const [authError, setAuthError] = useState({
        email: '',
        password: ''
    })

    const [msgError, setMsgError] = useState('');

    useEffect(() => {
        if (rdxUserData.credentials) {
            navigate("/")
        }
    }, [rdxUserData])
console.log(rdxUserData);
    const [checked, setChecked] = useState(false)

    const switchHandler = (e) => {
        setChecked(e.target.checked)
    }

    const functionHandler = (e) => {
        setAuth((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
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
                        if (response.error) {
                            setError("Invalid Email or Password")
                        } else {
                            dispatch(login({ credentials: response.data.token }))
                            let decoded = jwtDecode(response.data.token)
                            dispatch(login({role: decoded.role}))
                            setTimeout(() => {
                                navigate("/")
                            }, 500);
                        }
                    }
                )
                .catch((error) => {
                    console.log(error);
                    setMsgError(error.message);

                });
        } else {

            logWorker(auth)
                .then(
                    (response) => {
                        console.log(response);

                        if (response.error) {
                            setError("Invalid Email or Password")
                        } else {
                            dispatch(login({ credentials: response.data.token }))
                            let decoded = jwtDecode(response.data.token)
                            dispatch(login({role: decoded.role}))
                            setTimeout(() => {
                                if (decoded.role === "superAdmin") {
                                    navigate("/administration")
                                } else {
                                    navigate("/worker")
                                }

                            }, 500);
                        }
                    }
                )
                .catch((error) => {
                    console.log(error);
                    setMsgError(error.message);

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
                            functionChange={switchHandler}
                        />
                    </div>
                    <div className="space"></div>
                    <CustomInput
                        disabled={false}
                        design={`inputDesign ${authError.emailError !== "" ? 'inputDesignError' : ''}`}
                        type={"email"}
                        name={"email"}
                        placeholder={"EMAIL"}
                        value={""}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{authError.emailError}</div>
                    <CustomInput
                        disabled={false}
                        design={`inputDesign ${authError.passwordError !== "" ? 'inputDesignError' : ''}`}
                        type={"password"}
                        name={"password"}
                        placeholder={"PASSWORD"}
                        value={""}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='MsgError'>{authError.passwordError}</div>
                    <div className='registerButton'>
                        <Link to="/register">Register</Link>
                    </div>
                    <div className='buttonSubmit' onClick={Submit}>Login</div>
                    <div className='MsgError'>{msgError}</div>
                </div>
            </div>
        </div>

    );
};
