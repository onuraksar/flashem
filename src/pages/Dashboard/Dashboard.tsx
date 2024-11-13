import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import "./scss/Dashboard.scss";

const Dashboard = () => {

    return (
        <div className="dashboard-container">
            {/* todo: move these general components into a main layout to prevent reoccuring: */}
            <Header />
            <SideMenu />
        </div>
    )
}

export default Dashboard;