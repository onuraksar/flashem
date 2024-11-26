import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import NewSetForm from "./DashboardNewSetForm/DashboardNewSetForm";
import "./scss/Dashboard.scss";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import store from "../../stores/store";
import { NavLink } from "react-router-dom";
import ReactStrapModal from "../../components/ReactStrapModal/ReactStrapModal";

const Dashboard = () => {
    const mounted = useRef(true)

    const userId = store.getState()?.user?.user?.id

    const [isNewSetModalOpen, setIsNewSetModalOpen] = useState<boolean>(false)
    const toggleNewSetModal = () => setIsNewSetModalOpen(!isNewSetModalOpen)

    const [sets, setSets] = useState<{
        id: string,
        name: string,
        categoryId: string,
        categoryName: string
    }[]>([]);

    const [categories, setCategories] = useState<any>([])

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")
    const [selectedSetId, setSelectedSetId] = useState<string>()

    const handleNewSetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        toggleNewSetModal()
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
          const userDoc = await getDoc(doc(db, "users", uid))
          const userData = userDoc.data()
          setCategories(userData?.categories || [])
        } catch (error) {
          console.error("Error fetching categories:", error)
        }
    }

    const onSetDelete = async (setId: string) => {
        try {
            const setDocRef = doc(db, `users/${userId}/sets/${setId}`)
            await deleteDoc(setDocRef)
            refreshEvent()
        } catch (error) {
            console.error("Error deleting set:", error)
        }
    };

    const onSetEdit = (id: string) => {
        setSelectedSetId(id)
        toggleNewSetModal()
        // todo: Open Set Form, apply selectedSet's data to form, pass isEdit prop to determine to add or edit function in the form
    }

    const refreshEvent = async() => {
        await fetchSetsByCategory(selectedCategoryId)
        setIsNewSetModalOpen(false)
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
            <ReactStrapModal
                formId="dashboardNewSetForm"
                isOpen={isNewSetModalOpen}
                onClosed={() => setSelectedSetId(undefined)}
                toggleEvent={toggleNewSetModal}
                headerContent={selectedSetId ? "Edit Set" : "Add New Set"}
                confirmButtonLabel="Add"
                cancelButtonLabel="Close"
            >
                <NewSetForm data={sets.find(set => set.id === selectedSetId)} refreshEvent={refreshEvent} />
            </ReactStrapModal>
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
                                <button onClick={handleNewSetClick} className="dashboard__content__sets__top__action__btn">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add New Set</span>
                                </button>
                            </div>
                        </div>
                        <div className="dashboard__content__sets__bottom">
                            <div className="dashboard__content__sets__bottom__container">
                                {/* todo: add Loading: */}
                                {sets.length === 0 ? (
                                    <p>No sets available.</p>
                                ) : (
                                    sets.map(set => (
                                        <div className="set-item">
                                            <div className="set-item__title">
                                                {set.name}
                                            </div>
                                            <div className="set-item__action">
                                                <NavLink to={`/sets?id=${btoa(set.id)}`}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </NavLink>
                                                <Button onClick={() => onSetEdit(set.id)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button onClick={() => {onSetDelete(set.id)}}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </div>
                                        </div>
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