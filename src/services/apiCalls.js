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
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateClient = async (token, body) => {
    console.log(body);
    return await axios.put (`http://localhost:3000/client/account/modifyAccount`, body,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const setPrice = async (token, body) => {
    return await axios.put (`http://localhost:3000/appointment/workerupdate`, body,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const clientAppointment = async (token) => {
    return await axios.get (`http://localhost:3000/appointment/clientAppointment`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const workerAppointment = async (token) => {
    return await axios.get (`http://localhost:3000/appointment/tattooArtistAppointment`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const allClients = async (token) => {
    return await axios.get (`http://localhost:3000/client/clients`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const allAppointments = async (token) => {
    return await axios.get (`http://localhost:3000/appointment/allAppointments`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createAppointment = (token, body) => {
    console.log(token);
    return axios.post(`http://localhost:3000/appointment/create`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
};

export const updateAppointment = async (token, body) => {
    return await axios.put (`http://localhost:3000/appointment/update`, body,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteAppointment = async (token, body) => {
    return await axios.delete (`http://localhost:3000/appointment/delete`, body,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

