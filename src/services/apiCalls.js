import axios from 'axios';

export const logClient = async (body) => {

    console.log(body);
    
    return await axios.post(`http://localhost:3000/client/login`, body);
    
    
}

export const registerClient = async (body) => {
    console.log(body);
    //SIMULACRO DE CONEXION REAL A API
    return await axios.post(`http://localhost:3000/client/register`, body);
    //return "todo ha ido bien"
}