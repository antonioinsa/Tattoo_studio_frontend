import axios from 'axios';

export const allProducts = async (body) => {
    return await axios.get(`http://localhost:3000/client/products`, body)
}

export const logClient = async (body) => {
    console.log(body);
    return await axios.post(`http://localhost:3000/client/login`, body);
}

export const logWorker = async (body) => {
    console.log(body);
    return await axios.post(`http://localhost:3000/worker/login`, body);
}

export const registerClient = async (body) => {
    //console.log(body);
    return await axios.post(`http://localhost:3000/client/register`, body);
    //return "todo ha ido bien"
}