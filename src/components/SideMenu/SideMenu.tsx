import { faDumbbell, faGear, faHeart, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/SideMenu.scss";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
    return <div className="sidemenu">
        <div className="sidemenu__container">
            <NavLink to="/dashboard" className="sidemenu-item" >
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
            <button className="signout-btn">Sign Out</button>
        </div>
    </div> 
}

export default SideMenu;