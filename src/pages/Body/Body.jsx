import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { TattooArtist } from '../TattooArtist/TattooArtist';
import { Register } from '../Register/Register';
import { Product } from '../Products/Products';
import { Profile } from '../Profile/Profile';
import { NewAppointment } from '../NewAppointment/NewAppointment'
import { ClientAppointment } from '../ClientAppointment/ClientAppointment';
import { WorkerProfile } from '../WorkerProfile/WorkerProfile';
import { SuperAdmin } from '../SuperAdmin/SuperAdmin';

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tattooArtist" element={<TattooArtist />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Product />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/newappointment" elements={<NewAppointment />} />
                <Route path="/clientAppointment" elements={<ClientAppointment />} />
                <Route path="/worker" element={<WorkerProfile />} />
                <Route path="/administration" element={<SuperAdmin />} />
            </Routes>
        </>
    )
}