import { Outlet } from "react-router";
import "./scss/PublicLayout.scss";

const PublicLayout = () => {
    return (
        <div className="public-layout">
            <Outlet />
        </div>
    )
}

export default PublicLayout;