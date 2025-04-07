import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Url_Dashboard } from "../../utils/routeHelper";
import { useDispatch } from "react-redux";
import { setUser } from "../../stores/userSlice";
import { cookieLastActivityKey, setCookie } from "../../utils/cookieHelper";
import { doc, getDoc } from "firebase/firestore";
import "./scss/SignIn.scss";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getUserData = async (userId: string) => {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() ? userDoc.data() : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            console.log('user:', user)
            if (user) {
                console.log("Auth state changed, user:", user);
                const userData = await getUserData(user.uid);
                
                dispatch(setUser({
                    id: user.uid, 
                    email: user.email ?? "", 
                    fullName: userData?.fullName 
                }));
                
                setCookie(cookieLastActivityKey, new Date().toISOString());
                try {
                    const token = await user.getIdToken();
                    await fetch("http://localhost:5000/api/categories/default", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch (err) {
                    console.error("Failed to ensure default category", err);
                }
                navigate(Url_Dashboard);
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate]);

    return (
        <div className="signin-form">
            <div className="signin-form__container">
                <h2 className="signin-form__container__title">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="signin-form-field-container">
                        <div className="signin-form-field">
                            <div className="signin-form-field__label">Email:</div>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="signin-form-field">
                            <div className="signin-form-field__label">Password:</div>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit">Submit</button>                
                </form>
            </div>
        </div>
    );
};

export default SignIn;