import axios from 'axios';

export const tattooArtistProductsId= async (body) => {
    return await axios.post(`http://localhost:3000/tattooArtistProducts`, body)
}

export const allProducts = async () => {
    return await axios.get(`http://localhost:3000/products`)
}

export const TattooArtistList = async () => {
    return await axios.get(`http://localhost:3000/worker/current`)
}

export const logClient = async (body) => {
    //console.log(body);
    return await axios.post(`http://localhost:3000/client/login`, body);
}

export const logWorker = async (body) => {
    //console.log(body);
    return await axios.post(`http://localhost:3000/worker/login`, body);
}

export const registerClient = async (body) => {
    //console.log(body);
    return await axios.post(`http://localhost:3000/client/register`, body);

}