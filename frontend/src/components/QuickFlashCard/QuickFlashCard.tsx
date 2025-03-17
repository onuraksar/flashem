import "./scss/QuickFlashCard.scss";
import { QuickFlashCardProps } from "./types/QuickFlashCardProps";

const QuickFlashCard = (quickFlashCardProps: QuickFlashCardProps) => {

    const { frontText, backText, isFlipped } =  quickFlashCardProps;

    return (
        <>
            <div className={`quick-flashcard ${isFlipped ? "quick-flashcard--flipped" : ""}`}>
                <div className="quick-flashcard__front">
                    <div className="quick-flashcard__front__content">
                        {frontText}
                    </div>
                </div>
                <div className="quick-flashcard__back">
                    <div className="quick-flashcard__back__content">
                        {backText}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuickFlashCard;