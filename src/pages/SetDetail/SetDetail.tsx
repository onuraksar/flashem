import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import store from "../../stores/store";
import { db } from "../../firebaseConfig";
import { Button, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, UncontrolledDropdown } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisVertical, faPenToSquare, faPlus, faShareNodes, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./scss/SetDetail.scss"; 
import { toast } from "react-toastify";

const SetDetail = () => {
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    // todo: use atob right here if okay
    const setId = queryParams.get('id')

    const userId = store.getState()?.user?.user?.id

    // todo: any düzelt:
    const [flashCards, setFlashCards] = useState<any>()
    const [setName, setSetName] = useState<string>() 
    const [isPublic, setIsPublic] = useState<boolean>(false)

    const getFlashCardsBySetId = async (setId: string) => {
        const flashCardsRef = collection(db, `users/${userId}/flashcards`);
        const flashCardsQuery = query(flashCardsRef, where("setId", "==", setId));
        const querySnapshot = await getDocs(flashCardsQuery);
        const filteredFlashCards = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setFlashCards(filteredFlashCards)
    };

    const getSetsData = async () => {
        const setDoc = doc(db, `users/${userId}/sets`, `${atob(setId ?? "")}`);
        const setSnap = await getDoc(setDoc)
        const flashCardSetName = setSnap.data()?.name
        setSetName(flashCardSetName)
    }

    const handleSetEdit = () => {

    }

    const handleSetDelete = () => {
        
    }

    const handleSetShare = () => {
        
    }

    
    const handleAddNewFlashCard = () => {

    }

    const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // todo: make service request to change publicity of the set to make it sharable:
        // todo: after successful request, make toast message and toggle Switch:
        toast.success(`Set is now ${e.target.checked ? "public" : "private"}`)
        setIsPublic(!isPublic)
    }

    useEffect(() => {
        if(setId) {
            const setIdAtob = atob(setId)
            getSetsData()
            getFlashCardsBySetId(setIdAtob)
        }
    }, [setId])


    return (
        <div className="set-detail">
            <div className="set-detail__header">
                <div className="set-detail__header__left">
                    <div className="set-detail__header__left__title">{setName}</div>
                    <div className="set-detail__header__left__actions">
                        {/* todo: make this into a reusable component: */}
                        <UncontrolledDropdown direction="end" >
                            <DropdownToggle>
                               <FontAwesomeIcon icon={faEllipsisVertical} />
                            </DropdownToggle>
                            <DropdownMenu container="body">
                                <DropdownItem onClick={handleSetEdit}>
                                    <div className="drop-down-item">
                                        <div className="drop-down-item__icon"><FontAwesomeIcon icon={faPenToSquare} /> </div>
                                        <div className="drop-down-item__label">Edit</div>
                                    </div>
                                </DropdownItem>
                                <DropdownItem onClick={handleSetDelete}>
                                    <div className="drop-down-item">
                                        <div className="drop-down-item__icon"><FontAwesomeIcon icon={faTrash} /> </div>
                                        <div className="drop-down-item__label">Delete</div>
                                    </div>
                                </DropdownItem>
                                <DropdownItem onClick={handleSetShare}>
                                    <div className="drop-down-item">
                                        <div className="drop-down-item__icon"><FontAwesomeIcon icon={faShareNodes} /> </div>
                                        <div className="drop-down-item__label">Share</div>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* todo: make this into a switch componnet: */}
                        {/* <FormGroup switch>
                            <Input type="switch" role="switch" checked={isPublic} onChange={handleSwitch} />
                            <Label check> {isPublic ? "Make Private" : "Make Public"} </Label>
                        </FormGroup> */}
                    <Button>Shuffle!</Button>

                    </div>
                </div>
                <div className="set-detail__header__right">
                    <FormGroup switch>
                        <Input type="switch" role="switch" checked={isPublic} onChange={handleSwitch} />
                        <Label check> {isPublic ? "Make Private" : "Make Public"} </Label>
                    </FormGroup>
                </div>
            </div>
            <div className="set-detail__container">
                <div className="flashcard-item-container">
                    <div className="flashcard-item-add" onClick={handleAddNewFlashCard}>
                        <FontAwesomeIcon className="flashcard-item-add__icon" icon={faPlus} />
                        <div className="flashcard-item-add__label">Add New Flashcard</div>
                    </div>
                    {/* todo: add skeleton loading until data loads: */}
                    {flashCards?.map((flashcard: any) => {
                        return (
                            <div key={flashcard.id} className="flashcard-item">
                                <div className="flashcard-item__left">
                                    <div>
                                        <label>Front</label>
                                        <div>{flashcard.front}</div>
                                    </div>
                                    <div>
                                        <label>Back</label>
                                        <div>{flashcard.back}</div>
                                    </div>
                                </div>
                                <div className="flashcard-item__right">
                                    <Button id="edit" onClick={() => console.log("clicked")} ><FontAwesomeIcon icon={faEdit} /> </Button>
                                    <Button id="delete" onClick={() => console.log("clicked")} ><FontAwesomeIcon icon={faTrash} /> </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    ) 
}

export default SetDetail;