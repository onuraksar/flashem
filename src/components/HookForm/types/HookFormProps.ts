export interface HookFormProps {
    id?: string
    isEdit?: boolean
    className?: string
    FormComponent:  React.ComponentType<any>
    externalProps?: any
}