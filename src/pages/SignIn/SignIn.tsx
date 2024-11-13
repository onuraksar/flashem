import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Url_Dashboard } from "../../utils/routeHelper";

const SignIn = () => {

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('userCredential', userCredential)
            if(userCredential.user) {
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