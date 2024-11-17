import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./scss/SignUp.scss";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Url_Dashboard } from "../../utils/routeHelper";
import { defaultCategories } from "../../settings/categorySettings";

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
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

    // todo: might consider using formik or hook form for form management:
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user =  userCredential.user;
            if (user) {
                await createUserProfile(user.uid, formData.fullName, user.email ?? "", );
            }
          } catch (error) {
            console.error("Error signing up:", error);
          }
    };

    const createUserProfile = async (userId: string, fullName: string, email?: string) => {
        try {
            await setDoc(doc(db, "users", userId), {
                fullName,
                email,
                createdAt: new Date(),
                categories: defaultCategories,
                sets: {}
            });
            navigate(Url_Dashboard)
        } catch (error) {
            console.error("Error creating user profile:", error);
        }
    };

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="signup-form-field-container">
                    <div className="signup-form-field" >
                        <span className="signup-form-field__label">Full name:</span>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    </div>
                    <div className="signup-form-field">
                        <span className="signup-form-field__label">Email:</span>
                        <input type="email" name="email"  value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="signup-form-field">
                        <span className="signup-form-field__label">Password:</span>
                        <input type="password" name="password"  value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit">Register</button>                
            </form>
        </div>
    )
}

export default SignUp;