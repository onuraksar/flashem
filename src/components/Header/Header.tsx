import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import staticUserImage from "../../assets/images/user-avatar-static.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./scss/Header.scss";
import { addDoc, collection, getDocs } from "firebase/firestore";
import store from "../../stores/store";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {

    const userId = store.getState()?.user?.user?.id
    const mounted = useRef(true)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<any>({ front: "", back: "", setId: "" })

    const [isAddFlashCardModalOpen, setIsAddFlashCardModalOpen] = useState<boolean>(false)
    const toggleAddFlashCardModal = () => setIsAddFlashCardModalOpen(!isAddFlashCardModalOpen)

    const [sets, setSets] = useState<any>()

    const toastMessage = (setId: string) => (
        <div className="flashcard-toast-message">
            <div className="flashcard-toast-message__title">Flashcard successfully added!</div>
            <div className="flashcard-toast-message__link" onClick={() => navigate(`/sets?id=${btoa(setId)}`)}>
                View it in the Set
            </div>
        </div>
    );

    const onSubmitHandle = (e: FormEvent) => {
        e.preventDefault();
        console.log('formData:', formData)
        createFlashcard(formData.front, formData.back, formData.setId)
        // todo: fix handle submit
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('e.target:', e.target)
        setFormData({ ...formData, [name]: value });
    };

    const fetchSets = async () => {
        const setsRef = collection(db, `users/${userId}/sets`);
        const querySnapshot = await getDocs(setsRef);
        const filteredSets = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setSets(filteredSets)
    };

    const createFlashcard = async (front: string, back: string, setId: string) => {
        if(userId) {
            const flashCard = {
                front,
                back,
                setId,
                createdAt: new Date(),
            };
            const flashCardsCollectionRef = collection(db, `users/${userId}/flashcards`);
            await addDoc(flashCardsCollectionRef, flashCard);

            toast.success(toastMessage(setId))

            toggleAddFlashCardModal()
        }
    };

    useEffect(() => {
        if(mounted.current) {
            fetchSets()
        }
    }, [])

    return (
        <>
            <Modal isOpen={isAddFlashCardModalOpen} toggle={toggleAddFlashCardModal}>
                <ModalHeader toggle={toggleAddFlashCardModal}>Quick Flash Card</ModalHeader>
                <ModalBody>
                    <Form id="quickFlashCardForm" onSubmit={onSubmitHandle}>
                        <FormGroup>
                            <Label for="front">Front:</Label>
                            <Input id="front" name="front" type="text" value={formData.front} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="back">Back:</Label>
                            <Input id="back" name="back" type="text" value={formData.back} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="setId">Choose a Set:</Label>
                            <Input
                                id="setId"
                                name="setId"
                                type="select"
                                onChange={handleInputChange}
                            >
                                <option value="" selected disabled>Choose here</option>
                                {sets?.map((set: any, index: number) => (
                                    <option key={set.id} value={set.id}>
                                        {set.name}
                                    </option>
                                ))}
                            </Input>    
                        </FormGroup>

 
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" form="quickFlashCardForm">
                        Add
                    </Button>
                    <Button color="secondary" onClick={toggleAddFlashCardModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>        
            <div className="header">
                <div className="header__left">
                    <div className="header-brand">Flash'em</div>
                </div>
                <div className="header__right">
                    <div className="header-action">
                        <Button onClick={toggleAddFlashCardModal}>
                            <FontAwesomeIcon icon={faBolt} />
                        </Button>
                    </div>
                    <div className="header-user">
                        <div className="header-user__name">Onur Akşar</div>
                        <div className="header-user__icon">
                            {/* todo: fix static profile pic: */}
                            <img className="header-user__icon__img" src={staticUserImage} alt="static-user-image" /> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;