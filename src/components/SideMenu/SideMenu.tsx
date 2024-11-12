import { faFlipboard } from "@fortawesome/free-brands-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu = () => {
    return <div className="sidemenu">
        <div className="sidemenu-item">
            <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faHouse}/></div>
            <div className="sidemenu-item__label">Dashboard</div>
        </div>
        <div className="sidemenu-item">
            <div className="sidemenu-item__icon"><FontAwesomeIcon icon={faFlipboard}/></div>
            <div className="sidemenu-item__label">My Cards</div>
        </div>
        <div className="sidemenu-item"></div>
    </div> 
}

export default SideMenu;