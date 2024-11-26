import { ReactNode } from "react"
import { ReactStrapModalSize } from "./ReactStrapModalSize"

export interface ReactStrapModalProps {
    unmountOnClose?: boolean
    children: ReactNode
    onClosed?: () => void
    isOpen: boolean
    formId: string
    toggleEvent: () => void
    size?: ReactStrapModalSize
    className?: string
    isFullScreen?: boolean
    isHideHeader?: boolean
    isHideFooter?: boolean
    isHideConfirmButton?: boolean
    isHideCancelButton?: boolean
    headerContent?: ReactNode
    cancelEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    confirmEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    confirmButtonLabel?: string
    cancelButtonLabel?: string
}