import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { TattooArtist } from '../TattooArtist/TattooArtist';
import { Register } from '../Register/Register';
import { Product } from '../Products/Products';
import { Profile } from '../Profile/Profile';
import { WorkerProfile } from '../WorkerProfile/WorkerProfile';
import { SuperAdmin } from '../SuperAdmin/SuperAdmin';
import { AppointmentHistory } from '../AppointmentHistory/AppointmentHistory';
import { NewAppointment } from '../NewAppointment/NewAppointment';
import { AllAppointments } from '../AllAppointments/AllAppointments'
import { AllClients } from '../AllClients/AllClients'

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
                <Route path="/worker" element={<WorkerProfile />} />
                <Route path="/administration" element={<SuperAdmin />} />
                <Route path="/appointmenthistory" element={<AppointmentHistory />} />
                <Route path="/NewAppointment" element={<NewAppointment />} />
                <Route path="/allappointments" element={<AllAppointments />} />
                <Route path="/allclients" element={<AllClients />} />

            </Routes>
        </>
    )
}