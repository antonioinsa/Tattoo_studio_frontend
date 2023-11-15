import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const rdxCredentials = useSelector(userData);
    
    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        navigate("/")
    }
    return (
        <div className='headerDesign'>
            <LinkButton
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                path={"/tattooArtist"}
                title={"Tattoo Artist"}
            />
            {!rdxCredentials?.credentials ? (
                <LinkButton
                    path={"/login"}
                    title={"Login/Register"}
                />
            ) : (
                <>
                <div onClick={logOutMe}>
                        <LinkButton path={"/accountClient"} title={"Account"} />
                    </div>
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log out"} />
                    </div>
                    
                </>
            )}
        </div>
    );
}