import React from 'react';
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router";

const HeaderBtn = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const buttonClickHandler = () => {
        if (auth.state?.user)
            auth.signOut(() => {
                navigate('/', {replace: true})
                window.location.reload()
            })
        else
            navigate("/logIn")
    }

    console.log(auth.state)
    return (
        <header>
            <button onClick={buttonClickHandler}>{auth.state?.user ? "Log Out" : "Log In"}</button>
        </header>
    );
};

export default HeaderBtn;