import { Link } from "react-router-dom";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import "./Home.css";

export const Home = () => {
    return (
        <div className="global">
            <div className="homeDesign">
                <div className="logo">
                    <Link to="/register">
                        <img draggable="false" src="./src/Images/zaharia_logo.png" className="portada" alt="Logo" />
                    </Link>
                </div>
                <div>
                    <LinkButton
                        path={"/tattooArtist"}
                        title={"Tattoo Artist"}
                    />
                </div>
            </div>
        </div>
    )
}