import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { TattooArtist } from '../TattooArtist/TattooArtist';
import { Register } from '../Register/Register';
import { Product } from '../Products/Products';
import { Profile } from '../Profile/Profile';

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/tattooArtist" element={<TattooArtist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/worker" element={<Worker />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Product />} />
            </Routes>
        </>
    )
}