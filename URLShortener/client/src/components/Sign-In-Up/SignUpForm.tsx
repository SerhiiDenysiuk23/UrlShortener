import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {User} from "../../types/User";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {createUserAction, set_fails_user} from "../../store/User/User.slice";
import Input from "./Input";
import {useAuth} from "../../hooks/useAuth";

const SignUpForm = () => {
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [userData, setUserData] = useState<User>({
        id: "",
        email: "",
        password: undefined
    })
    const {fails, user} = useAppSelector(state => state.user)

    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const validateForm = () => {
        dispatch(set_fails_user({
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
                ? ''
                : 'The email must be a valid email address.',
            password: (!!userData.password && userData.password.length > 0) ? "" : "Wrong password",
            passwordCheck: userData.password === repeatPassword ? "" : "Password do not match"
        }));
    };

    const auth = useAuth();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validateForm()
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, email: e.target.value})
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, password: e.target.value})
    }
    const handlePassRepeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
    }

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
            return;
        }

        for (const fail in fails) {
            if (fails[fail].length != 0)
                return
        }
        dispatch(createUserAction(userData))
    }, [fails])


    useEffect(() => {
        if (!!user && !!userData.password) {
            auth.signIn({email: userData.email, password: userData.password}, () => {})
        }
    }, [user])

    useEffect(() => {
        if (auth.state?.user)
            navigate("/", {replace: true})
    }, [auth.state?.user])

    return (
        <section className="formSection">
            <form onSubmit={handleSubmit} className={"form"}>
                <Input placeholder={"Email"}
                       value={userData.email}
                       onChange={handleEmailChange}
                       fail={fails.email}/>
                <Input placeholder={"Password"}
                       value={userData.password ?? ""}
                       onChange={handlePasswordChange}
                       fail={fails.password}
                       type={"password"}/>
                <Input placeholder={"Repeat Password"}
                       value={repeatPassword}
                       onChange={handlePassRepeatChange}
                       fail={fails.passwordCheck}
                       type={"password"}/>
                <button className={"button"} type="submit">Sign up</button>

                <div>
                    <span className="signUpLink">Have an account? </span>
                    <Link className="signUpLink" to="/logIn">
                        Log In
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;