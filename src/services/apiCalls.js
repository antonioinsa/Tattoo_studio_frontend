import axios from 'axios';

export const allProducts = async () => {
    return await axios.get(`http://localhost:3000/products`)
}

export const piercingProducts= async () => {
    return await axios.get(`http://localhost:3000/onlypiercing`)
}

export const tattooProducts= async () => {
    return await axios.get(`http://localhost:3000/onlytattoo`)
}

export const TattooArtistList = async () => {
    return await axios.get(`http://localhost:3000/worker/current`)
}

export const logClient = async (body) => {
    return await axios.post(`http://localhost:3000/client/login`, body);
}

export const logWorker = async (body) => {
    return await axios.post(`http://localhost:3000/worker/login`, body);
}

export const registerClient = async (body) => {
    return await axios.post(`http://localhost:3000/client/register`, body);

}

export const dataClient = async (token) => {
    return await axios.get (`http://localhost:3000/client/account`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateClient = async (token) => {
    console.log(token);
    return await axios.put (`http://localhost:3000/client/account/modifyAccount`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}