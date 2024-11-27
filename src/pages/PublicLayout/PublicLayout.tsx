import { Outlet } from "react-router";
import "./scss/PublicLayout.scss";

const PublicLayout = () => {
    return (
        <div className="public-layout">
            <div className="public-layout__left">
                Welcome to Flash'em !
            </div>
            <div className="public-layout__right">
                <div className="public-layout__right__container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PublicLayout;