import { FormGroup, Input, Label } from "reactstrap";
import { QuickFlashCardFormProps } from "./types/QuickFlashCardFormProps";
import { ChangeEvent, useEffect } from "react";

const QuickFlashCardForm = (quickFlashCardFormProps: QuickFlashCardFormProps) => {

    const {formProps, setDefaultValues} = quickFlashCardFormProps;

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     let additionalData = {};

    //     if (e.target instanceof HTMLSelectElement) {
    //         const selectedOption = e.target.selectedOptions[0];
    //         const setName = selectedOption?.getAttribute("data-name") ?? "";
    //         additionalData = { setName };
    //     }
    //     formProps.setValue({ ...formData, [name]: value, ...additionalData });
    // };
    
    // const handleInputsFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    //     setIsFlipped(e.target.name === "back")
    // }

    useEffect(() => {
        if(setDefaultValues)
            setDefaultValues({
                front: "",
                back: "",
                setId: "",
                setName: ""
            })
    }, [])

    useEffect(() => {
        console.log('formProps.getValues useEffect ', formProps.getValues())
    }, [formProps.getValues()])

    return (
        <>
            {/* <FormGroup>
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
            </FormGroup> */}
        </>

    )
}

export default QuickFlashCardForm;