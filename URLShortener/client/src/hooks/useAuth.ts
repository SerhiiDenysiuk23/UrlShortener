import {useContext} from "react";
import {authContext} from "../components/Sign-In-Up/AuthProvider";

export const useAuth = () => useContext(authContext)