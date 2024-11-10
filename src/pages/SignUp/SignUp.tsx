import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./scss/SignUp.scss";
import { auth } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {

    // const [fullName, setFullName] = useState<string>("")
    // const [email, setEmail] = useState<string>("")
    // const [password, setPassword] = useState<string>("")

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

    // todo: might consider using ui library for inputs
    // todo: might consider using formik or hook form for form management:
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
        console.log("Form data submitted:", formData);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user =  userCredential.user;
            if (user) {
                await createUserProfile(user.uid, email);
            }
          } catch (error) {
            console.error("Error signing up:", error);
          }
    };

    const createUserProfile = async (userId: string, email: string) => {
        try {
            await setDoc(doc(db, "users", userId), {
                email,
                createdAt: new Date(),
            });
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