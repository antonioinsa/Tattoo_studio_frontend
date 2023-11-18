import "./SuperAdmin.css";
import { Link } from "react-router-dom";

export const SuperAdmin = () => {

    return (
        <div className="superAdminDesign">
            <div className="optionsDesign">
                <div className='buttonSa'><Link to="/allclients">All Clients</Link></div>
                <div className='buttonSa'><Link to="/appointmentsavailable">Appointments available</Link></div>
                <div className='buttonSa'><Link to="/editAppointment">Edit appointment</Link></div>
                <div className='buttonSa'><Link to="/deleteAppointment">Delete appointment</Link></div>
            </div>
        </div>
    )
}
