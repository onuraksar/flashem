import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/Dashboard.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

    return (
        <div className="dashboard">
            <div className="dashboard__greeting">
                <h2 className="dashboard__greeting__header">Welcome to Flash'em! </h2>
                <p className="dashboard__greeting__subtext">Here you can view your sets</p>
            </div>
            <div className="dashboard__content">
                <div className="dashboard__content__sets">
                    <div className="dashboard__content__sets__top">
                        <div className="dashboard__content__sets__top__title">My Sets</div>
                        <div className="dashboard__content__sets__top__action">
                            <FontAwesomeIcon icon={faPlus} />
                            {/* todo: add functionality here: */}
                            <button className="dashboard__content__sets__top__action__btn">Add New Set</button>
                        </div>
                    </div>
                    <div className="dashboard__content__sets__bottom">
                        <div className="dashboard__content__sets__bottom__container">
                            <div className="set-item">
                                <div className="set-item__title">Deutsch</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;