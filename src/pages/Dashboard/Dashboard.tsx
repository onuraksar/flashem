import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faEdit, faPlus, faRightLeft, faRightLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import NewSetForm from "./DashboardNewSetForm";
import "./scss/Dashboard.scss";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import store from "../../stores/store";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
    const mounted = useRef(true)

    const userId = store.getState()?.user?.user?.id

    const [isNewSetModalOpen, setIsNewSetModalOpen] = useState<boolean>(false)
    const toggleNewSetModal = () => setIsNewSetModalOpen(!isNewSetModalOpen)

    const [sets, setSets] = useState<any[]>([]);
    const [categories, setCategories] = useState<any>([])

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")


    const handleNewSetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsNewSetModalOpen(true)
    }

    const fetchSetsByCategory = async (categoryId: string) => {
        const setsRef = collection(db, `users/${userId}/sets`);
        const setsQuery = categoryId === "all" ? setsRef : query(setsRef, where("categoryId", "==", categoryId));
        const querySnapshot = await getDocs(setsQuery);
        const filteredSets = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setSets(filteredSets)
    };

    const fetchCategories = async (uid: string) => {
        try {
            // todo: create a getDoc function to make it global to prevent importing doc, db for all instances:
          const userDoc = await getDoc(doc(db, "users", uid));
          const userData = userDoc.data();
          setCategories(userData?.categories || []);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        if(mounted.current && userId) {
            fetchCategories(userId)
        }
        return () => {
            mounted.current = false
        }
    }, [])

    useEffect(() => {
        fetchSetsByCategory(selectedCategoryId)
    }, [selectedCategoryId, userId])

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
                            <div className="dashboard__content__sets__top__filter">
                                <Input
                                    id="categoryId"
                                    name="categoryId"
                                    type="select"
                                    onChange={(e) => {
                                        setSelectedCategoryId(e.target.value)
                                    }}
                                >
                                    <option value="all" selected >All</option>
                                    {categories?.map((category: any) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <div className="dashboard__content__sets__top__action">
                                <FontAwesomeIcon icon={faPlus} />
                                <button onClick={handleNewSetClick} className="dashboard__content__sets__top__action__btn">Add New Set</button>
                            </div>
                        </div>
                        <div className="dashboard__content__sets__bottom">
                            <div className="dashboard__content__sets__bottom__container">
                                {/* todo: add Loading: */}
                                {sets.length === 0 ? (
                                    <p>No sets available.</p>
                                ) : (
                                    sets.map(set => (
                                        <NavLink className="set-item" to={`/sets/id?=${btoa(set.id)}`}>
                                            <div className="set-item__title">
                                                {set.name}
                                            </div>
                                            <div className="set-item__action">
                                                <Button><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                        </NavLink>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="dashboard__content__scores">
                        Scores
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Dashboard;