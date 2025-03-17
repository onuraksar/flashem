import { FieldValues, UseFormReturn } from "react-hook-form"

// todo: configure this part, eliminate unneessary props
export interface HookFormComponentProps<T extends FieldValues> {
    formProps: UseFormReturn<T>
    id?: number
    isEdit: boolean
    className?: string
    FormComponent: React.ComponentType<any>
    setDefaultValues?: (values: T) => void 
    setFormEvents: () => void
    setValidationSchema: () => void
    externalProps?: any
    isButtonsTop?: boolean
    hideSaveButton?: boolean
    hideDeleteButton?: boolean
    hideCustomButton?: boolean
    labelCustomButton?: string | JSX.Element
    noConfirmationSaveButton?: boolean
    noConfirmationDeleteButton?: boolean
    confirmationModalBody?: string | JSX.Element
    confirmationModalTitle?: string | JSX.Element
    deleteModalBody?: string | JSX.Element
    deleteModalTitle?: string | JSX.Element
}