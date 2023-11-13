import { DateInput } from "@mantine/dates";
import "./AccountClient.css";

export const AccountClient = () => {
    return (
        <div className="accountClientDesign">
            <div className="Profile">
                <div>Profile</div>
                <div>Update profile</div>
                <div>Delete profile</div>
            </div>
            <div className="NewAppointment"><DateInput/></div>
            <div className="Appointments"></div>
        </div>
    )
}