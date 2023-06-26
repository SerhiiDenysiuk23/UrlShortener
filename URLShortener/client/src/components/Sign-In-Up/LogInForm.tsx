import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Input from "./Input";
import {setError} from "../../store/Auth/Auth.slice";
import {useAuth} from "../../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {useNavigate} from "react-router";
import {AuthorizationUser} from "../../types/Auth";

interface AuthenticationFormState {
    userData: AuthorizationUser,
    error?: string | null
}

const initialState: AuthenticationFormState = {
    userData: {
        email: '',
        password: ''
    },
    error: null
}

const LogInForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [state, setState] = useState(initialState);
    const authErrorMessage = useAppSelector(state => state.auth.error);
    const auth = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        auth.signIn(state.userData, () => {
        })
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, userData: {...state.userData, email: e.target.value}})
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, userData: {...state.userData, password: e.target.value}})
    }

    useEffect(() => {
        if (authErrorMessage) {
            setState({...state, error: authErrorMessage})
            dispatch(setError(''));
        }
    }, [authErrorMessage])

    useEffect(() => {
        console.log("+")
        if (auth.state?.user != null)
            navigate("/", {replace: true})
    }, [auth.state?.user])

    return (
        <section className="formSection">
            <form onSubmit={handleSubmit} className={"form"}>
                <Input value={state.userData.email}
                       placeholder={"Email"}
                       onChange={handleEmailChange} fail={""}/>
                <Input value={state.userData.password}
                       placeholder={"Password"}
                       onChange={handlePasswordChange}
                       type={"password"} fail={""}/>
                {
                    state.error
                        ? <span className={"pass-or-email-fail"}>Wrong password or email</span>
                        : null
                }

                <button className={"button"} type="submit">Log In</button>
                <div>
                    <span className={"signUpLink"}>Don't have an account? </span>
                    <Link className="signUpLink" to="/signUp">
                        Sign Up
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default LogInForm;