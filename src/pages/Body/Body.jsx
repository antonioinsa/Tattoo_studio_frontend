import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { TattooArtist } from '../TattooArtist/TattooArtist';
import { Register } from '../Register/Register';


export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/tattooArtist" element={<TattooArtist />}/>
                <Route path="/register" element={<Register />}/>
                <Route path ="/worker" element={<Worker />}/>
            </Routes>
         </>
     )
}