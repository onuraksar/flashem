import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import NewSetForm from "./DashboardNewSetForm";
import "./scss/Dashboard.scss";

const Dashboard = () => {

    const [isNewSetModalOpen, setIsNewSetModalOpen] = useState<boolean>(false)
    const toggleNewSetModal = () => setIsNewSetModalOpen(!isNewSetModalOpen)

    const handleNewSetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsNewSetModalOpen(true)
    }

    return (
        <>
            <Modal isOpen={isNewSetModalOpen} toggle={toggleNewSetModal}>
                <ModalHeader toggle={toggleNewSetModal}>Add New Set</ModalHeader>
                <ModalBody>
                    <NewSetForm />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" form="dashboardNewSetForm">
                        Add
                    </Button>
                    <Button color="secondary" onClick={toggleNewSetModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
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
                                <button onClick={handleNewSetClick} className="dashboard__content__sets__top__action__btn">Add New Set</button>
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
                    <div className="dashboard__content__scores">
                        Scores
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;