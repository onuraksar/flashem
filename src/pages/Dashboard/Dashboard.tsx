import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/Dashboard.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import store from "../../stores/store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Dashboard = () => {

    const mounted = useRef(true)

    // todo: add model for this any:
    const [categories, setCategories] = useState<any>([])

    const userId = store.getState()?.user?.user?.id
    const [isNewSetModalOpen, setIsNewSetModalOpen] = useState<boolean>(false)
    const toggleNewSetModal = () => setIsNewSetModalOpen(!isNewSetModalOpen)

    const handleNewSetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsNewSetModalOpen(true)
    }

    const handleNewSetSubmit = async() => {

    }

    const fetchCategories = async (uid: string) => {
        try {
          const userDoc = await getDoc(doc(db, "users", uid));
          const userData = userDoc.data();
          setCategories(userData?.categories || []);
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        }
    };

    useEffect(() => {
        if(mounted.current && userId) {
            fetchCategories(userId)
        }
        return () => {
            mounted.current = false
        }
    }, [])

    return (
        <>
            <Modal isOpen={isNewSetModalOpen} toggle={toggleNewSetModal}>
                <ModalHeader toggle={toggleNewSetModal}>Add New Set</ModalHeader>
                <ModalBody>
                    {/* todo: move this form to another page: */}
                    <Form>
                        <FormGroup>
                            <Label for="setName">Set Name:</Label>
                            <Input id="setName" name="setName" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="setCategory">Set Category</Label>
                            <Input
                                id="setCategory"
                                name="setCategory"
                                type="select"
                            >
                                {categories?.map((category: any) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleNewSetSubmit}>
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
                </div>
            </div>
        </>
    )
}

export default Dashboard;