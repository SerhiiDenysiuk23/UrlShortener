import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UrlTable from "./components/UrlTable";
import UrlAbout from "./components/UrlAbout";
import LogInForm from "./components/Sign-In-Up/LogInForm";
import SignUpForm from "./components/Sign-In-Up/SignUpForm";
import {AuthProvider} from "./components/Sign-In-Up/AuthProvider";
import HeaderBtn from "./components/HeaderBtn";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <HeaderBtn/>
                <Routes>
                    <Route path={"/"} element={<UrlTable/>}/>
                    <Route path={"/link/"} element={<UrlAbout/>}/>
                    <Route path={"/logIn"} element={<LogInForm/>}/>
                    <Route path={"/signUp"} element={<SignUpForm/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
