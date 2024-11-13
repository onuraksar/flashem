import staticUserImage from "../../assets/images/user-avatar-static.png";
import "./scss/Header.scss";

const Header = () => {

    return (
        <div className="header">
            <div className="header__left">
                <div className="header-brand">Flash'em</div>
            </div>
            <div className="header__right">
                <div className="header-user">
                    <div className="header-user__name">Onur Akşar</div>
                    <div className="header-user__icon">
                        {/* todo: fix static profile pic: */}
                        <img className="header-user__icon__img" src={staticUserImage} alt="static-user-image" /> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;