import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
    const dispatch = useDispatch();

    const rdxCredentials = useSelector(userData);

    const logOutMe = () => {

        dispatch(logout({ credentials: "" }))

        navigate("/")

    }

    console.log(rdxCredentials);


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
                    <LinkButton path={"/accountClient"} title={rdxCredentials.credentials.first_name} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log out"} />
                    </div>
                </>
            )}
        </div>
    );
}