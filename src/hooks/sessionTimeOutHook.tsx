import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../stores/userSlice";
import { cookieLastActivityKey, getCookie } from "../utils/cookieHelper";
import { timeOutMiliseconds } from "../utils/constants";
import { Url_Sign_In } from "../utils/routeHelper";
import { AppDispatch } from "../stores/store";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const useSessionTimeout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const lastActivityString = getCookie(cookieLastActivityKey);
        const lastActivityTime = new Date(lastActivityString ?? " ");
        const currentTime = new Date();
        const elapsedTime = currentTime.getTime() - lastActivityTime.getTime()
        if (elapsedTime > timeOutMiliseconds) {
             // todo: add toast message: Your session has ended, redirecting to sign in page.
            dispatch(clearUser());
            signOut(auth)
            navigate(Url_Sign_In);
        }
    }, [dispatch, navigate]);
};

export default useSessionTimeout;