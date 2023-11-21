import { LinkButton } from "../../common/LinkButton/LinkButton";
import "./Home.css";

export const Home = () => {
    return (
        <div className="global">
            <div className="homeDesign">
                <div className="logo">
                    <img draggable="false" src="./src/Images/zaharia_logo.png" className="portada"></img>
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