import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import store from "../../stores/store";
import { db } from "../../firebaseConfig";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const SetDetail = () => {
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const setId = queryParams.get('id')

    const userId = store.getState()?.user?.user?.id

    // todo: any düzelt:
    const [flashCards, setFlashCards] = useState<any>()

    const fetchFlashCardsBySetId = async (setId: string) => {
        const flashCardsRef = collection(db, `users/${userId}/flashcards`);
        const flashCardsQuery = query(flashCardsRef, where("setId", "==", setId));
        const querySnapshot = await getDocs(flashCardsQuery);
        const filteredSets = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log('filteredSets:', filteredSets)
        setFlashCards(filteredSets)
    };

    useEffect(() => {
        console.log('setID', setId)
        if(setId) {
            const setIdAtob = atob(setId)
            console.log('setIdAtob', setIdAtob)
            fetchFlashCardsBySetId(setIdAtob)
        }
        // todo: retrieve set Data
        // todo: retrieve flashcards data that belongs to this setId
    }, [setId])

    return <div>
        <div>Set Detail</div>
        <div>Flash Cards</div>
        <div className="flashcard-item-container">
            {flashCards?.map((flashcard: any) => {
                return (
                    <div className="flashcard-item">
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
}

export default SetDetail;