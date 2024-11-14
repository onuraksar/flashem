import { Outlet } from "react-router-dom";
import "./scss/AuthorizedLayout.scss";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";

const AuthorizedLayout = () => {
    return (
        <div className="authorized-layout">
            <Header />
            <SideMenu />
            <div className="authorized-layout__container">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthorizedLayout;