import axios from 'axios';

export const logClient = async (body) => {

    console.log(body);

    
    return await axios.post(`http://localhost:3000/client/login`, body);

}

export const registerUser = async (body) => {
    //SIMULACRO DE CONEXION REAL A API
    // return await axios.post(`elendpointdemipreciosobackend`, body);
    return "todo ha ido bien"
}