import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SetDetail = () => {
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const setId = queryParams.get('id')

    useEffect(() => {
        // todo: retrieve set Data
        // todo: retrieve flashcards data that belongs to this setId
    }, [setId])

    return <div>Set Detail</div>
}

export default SetDetail;