import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { ReactStrapModalProps } from "./types/ReactStrapModalProps";
import { ReactStrapModalSize } from "./types/ReactStrapModalSize";

const ReactStrapModal = (modalProps: ReactStrapModalProps) => {
    const { isOpen, className, toggleEvent, formId, headerContent, size = ReactStrapModalSize.Large, isFullScreen = false, isHideHeader = false, isHideFooter = false, isHideConfirmButton = false, 
        isHideCancelButton = false, children, onClosed, unmountOnClose = false, confirmEvent, cancelEvent,
        confirmButtonLabel, cancelButtonLabel
    } = modalProps;

    return (
        <>
            {isOpen && 
                <Modal 
                    size={size} 
                    fullscreen={isFullScreen} 
                    unmountOnClose={unmountOnClose} 
                    onClosed={onClosed} 
                    centered 
                    isOpen={isOpen} 
                    className={`react-strap-modal ${className}`}
                    toggle={toggleEvent}
                >
                    {!isHideHeader && <ModalHeader className="react-strap-modal-header" toggle={toggleEvent}>{headerContent}</ModalHeader>} 
                    <ModalBody>
                        {children}
                    </ModalBody>
                    {!isHideFooter && 
                        <ModalFooter>
                            {(!isHideConfirmButton || !isHideCancelButton) &&
                                <>
                                    <Button color="primary" type="submit" form={formId} onClick={(e) => {
                                        if(confirmEvent) {
                                            confirmEvent(e)
                                        }
                                    }}>
                                        {confirmButtonLabel ?? "OK"}
                                    </Button>
                                    <Button color="secondary" onClick={(e) => {
                                        if(cancelEvent) {
                                            cancelEvent(e)
                                        }
                                        toggleEvent()
                                    }}>
                                        {cancelButtonLabel ?? "Cancel"}
                                    </Button>
                                </>
                            }
                        </ModalFooter>
                    }
                </Modal>
            }
        </>
    )
}

export default ReactStrapModal;