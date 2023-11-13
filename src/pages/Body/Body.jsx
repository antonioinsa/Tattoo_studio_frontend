import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { TattooArtist } from '../TattooArtist/TattooArtist';
import { Register } from '../Register/Register';
import { AccountClient } from '../AccountClient/AccountClient'

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/tattooArtist" element={<TattooArtist />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path ="/worker" element={<Worker />}/>
                <Route path="/AccountClient" element={<AccountClient />}/>
            </Routes>
         </>
     )
}