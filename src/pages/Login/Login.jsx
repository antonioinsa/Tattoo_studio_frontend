import React from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logClient } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [msgError, setMsgError] = useState ('');
    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const logIn = () => {
        logClient(credentials)
        .then(
            result => {
                console.log(result);
                setTimeout(() => {
                    navigate ("/")
                },500)
            }
        )
        .catch (error => {
            console.log(error);
            setMsgError(error.message)
        });
    }
    return (
        <div className="loginDesign">
          <CustomInput
            design={"inputDesign"}
            type={"email"}
            name={"email"}
            placeholder={""}
            // value={}
            functionProp={functionHandler}
            // onBlur={}
          />
          <CustomInput
            design={"inputDesign"}
            type={"password"}
            name={"password"}
            placeholder={""}
            // value={}
            functionProp={functionHandler}
            // onBlur={}
          />
          <div className='buttonSubmit' onClick={logIn}>Login</div>
          <div>{msgError}</div>
        </div>
      );
}