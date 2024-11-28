import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import staticUserImage from "../../assets/images/user-avatar-static.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./scss/Header.scss";
import { addDoc, collection, getDocs } from "firebase/firestore";
import store from "../../stores/store";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactStrapModal from "../ReactStrapModal/ReactStrapModal";
import QuickFlashCard from "../QuickFlashCard/QuickFlashCard";
import { HookForm } from "../HookForm/HookForm";

const Header = () => {

    const userId = store.getState()?.user?.user?.id
    const userFullName = store.getState()?.user?.user?.fullName
    const mounted = useRef(true)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<any>({ front: "", back: "", setId: "", setName: "" })

    const [isAddFlashCardModalOpen, setIsAddFlashCardModalOpen] = useState<boolean>(false)
    const toggleAddFlashCardModal = () => setIsAddFlashCardModalOpen(!isAddFlashCardModalOpen)

    const [sets, setSets] = useState<any>()

    const [isFlipped, setIsFlipped] = useState<boolean>(false)

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
        createFlashcard(formData.front, formData.back, formData.setId, formData.setName)
        // todo: fix handle submit
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let additionalData = {};

        if (e.target instanceof HTMLSelectElement) {
            const selectedOption = e.target.selectedOptions[0];
            const setName = selectedOption?.getAttribute("data-name") ?? "";
            additionalData = { setName };
        }
        setFormData({ ...formData, [name]: value, ...additionalData });
    };
    
    const handleInputsFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFlipped(e.target.name === "back")
    }

    const fetchSets = async () => {
        const setsRef = collection(db, `users/${userId}/sets`);
        const querySnapshot = await getDocs(setsRef);
        const filteredSets = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setSets(filteredSets)
    };

    const createFlashcard = async (front: string, back: string, setId: string, setName: "") => {
        if(userId) {
            const flashCard = {
                front,
                back,
                setId,
                setName,
                tagId: "",
                tagName: "",
                note: "",
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

    const clearForm = () => {
        setFormData({ front: "", back: "", setId: "" })
    }

    return (
        <> 
            <ReactStrapModal
                isOpen={isAddFlashCardModalOpen}
                formId="quickFlashCardForm"
                className="quick-flashcard-modal"
                headerContent="Add Quick Flash Card"
                toggleEvent={toggleAddFlashCardModal}
                onClosed={clearForm}
            >
                <Form id="quickFlashCardForm" className="quick-flashcard-form" onSubmit={onSubmitHandle}>
                    <FormGroup>
                        <Label for="front">Front:</Label>
                        <Input
                            id="front"
                            name="front"
                            type="text"
                            value={formData.front}
                            onChange={handleInputChange}
                            onFocus={(handleInputsFocus)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="back">Back:</Label>
                        <Input
                            id="back"
                            name="back"
                            type="text"
                            value={formData.back}
                            onChange={handleInputChange}
                            onFocus={(handleInputsFocus)}
                        />
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
                                <option key={set.id} value={set.id} data-name={set.name}>
                                    {set.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Form>
                {/* <HookForm 
                    id="quickFlashCardForm"
                    FormComponent={}
                /> */}
                <QuickFlashCard 
                    frontText={formData.front} 
                    backText={formData.back} 
                    isFlipped={isFlipped} 
                />
            </ReactStrapModal>

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
                    <div className="header-user__name">{userFullName}</div>
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