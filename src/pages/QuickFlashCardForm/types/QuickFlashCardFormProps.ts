import { HookFormComponentProps } from "../../../common/models/base/HookFormComponentProps";

interface QuickFlashCardFormData {
    front: string
    back: string
    setId: string
    setName: string

}
export interface QuickFlashCardFormProps extends HookFormComponentProps<QuickFlashCardFormData> {
}