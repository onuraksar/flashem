import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Url_Dashboard } from "../../utils/routeHelper";
import { useDispatch } from "react-redux";
import { setUser } from "../../stores/userSlice";
import { cookieLastActivityKey, setCookie } from "../../utils/cookieHelper";
import { doc, getDoc } from "firebase/firestore";

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const getUserData = async (userId: string) => {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data()
        return userData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // todo: add toast message when the password is not correct
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userData = await getUserData(userCredential.user.uid)
            if(userCredential.user) {
                dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email ?? "", fullName: userData?.fullName }));
                setCookie(cookieLastActivityKey, new Date().toISOString());
                navigate(Url_Dashboard)
            }
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <div className="signin-form-field-container">
                <div className="signin-form-field">
                    <span className="signin-form-field__label">Email:</span>
                    <input type="email" name="email"  value={formData.email} onChange={handleChange} />
                </div>
                <div className="signin-form-field">
                    <span className="signin-form-field__label">Password:</span>
                    <input type="password" name="password"  value={formData.password} onChange={handleChange} />
                </div>
            </div>
            <button type="submit">Sign In</button>                
        </form>
    </div>
    )
}

export default SignIn;