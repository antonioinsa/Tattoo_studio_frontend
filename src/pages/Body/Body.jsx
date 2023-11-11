import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { TattooArtist } from '../TattooArtist/TattooArtist';


export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/tattooArtist" element={<TattooArtist />}/>
                
            </Routes>
         </>
     )
}