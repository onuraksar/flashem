import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { HookFormProps } from './types/HookFormProps'

const HookForm = (hookFormProps: HookFormProps) => {

    const { id, isEdit = true, FormComponent, externalProps, className } = hookFormProps;

    const [formEvents, setFormEvents] = useState({saveEvent: (values: any) => { }})
    const [defaultValues, setDefaultValues] = useState<any>()
    const [validationSchema, setValidationSchema] = useState<any>();
    const { control, ...formProps } = useForm({ resolver: validationSchema ? yupResolver(validationSchema) : undefined })

    useEffect(() => {
        if (defaultValues)
            formProps.reset(defaultValues)
    }, [defaultValues])

    return <FormProvider {...{ ...formProps, control: control }}>
        <form 
            id={`form-${id}`} 
            className={`hook-form ${className ?? ""}`} 
            onSubmit={formProps.handleSubmit(formEvents?.saveEvent)}
        >
            <FormComponent
                {...externalProps}
                id={id}
                isEdit={isEdit}
                isDirty={control._getDirty()}
                setValidationSchema={setValidationSchema}
                formProps={formProps}
                setFormEvents={setFormEvents}
                setDefaultValues={setDefaultValues} 
            />
        </form>
    </FormProvider>
}

export { HookForm }