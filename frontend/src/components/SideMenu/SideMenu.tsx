import { faDumbbell, faGear, faHeart, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/SideMenu.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores/store";
import { clearUser } from "../../stores/userSlice";
import { Url_Sign_In } from "../../utils/routeHelper";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const SideMenu = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    
    return <div className="sidemenu">
        <div className="sidemenu__container">
            {/* todo: add active style if active */}
            <NavLink to="/dashboard" className="sidemenu-item">
                <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faHouse}/></div>
                <div className="sidemenu-item__label">Dashboard</div>
            </NavLink>
            <NavLink to="/exercises" className="sidemenu-item" >
                <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faDumbbell}/></div>
                <div className="sidemenu-item__label">Exercises</div>
            </NavLink>

            <NavLink to="/settings" className="sidemenu-item" >
                <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faGear}/></div>
                <div className="sidemenu-item__label">Settings</div>
            </NavLink>
 

            <NavLink to="/social" className="sidemenu-item" >
                <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faHeart}/></div>
                <div className="sidemenu-item__label">Social</div>
            </NavLink>
    
            <NavLink to="/profile" className="sidemenu-item" >
                <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faUser}/></div>
                <div className="sidemenu-item__label">Profile</div>
            </NavLink>
        </div>
        <div className="sidemenu__footer">
            <button onClick={async(e) => {
                e.preventDefault();
                try {
                    await signOut(auth);
                    dispatch(clearUser());
                    navigate(Url_Sign_In);
                  } catch (error) {
                    console.error("Sign out failed:", error);
                }
            }} className="signout-btn">Sign Out</button>
        </div>
    </div> 
}

export default SideMenu;