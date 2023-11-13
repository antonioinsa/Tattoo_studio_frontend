import { LinkButton } from "../../common/LinkButton/LinkButton";
import "./Home.css";

export const Home = () => {
    return (
        <div className="homeDesign">
            <div>
            <LinkButton
                path={"/tattooArtist"}
                title={"Tattoo Artist"}
            />
            </div>
        </div>
    )
}