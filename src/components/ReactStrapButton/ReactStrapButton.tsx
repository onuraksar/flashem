import { ReactStrapButtonProps } from "./types/ReactStrapButton";
import "./scss/ReactStrapButton.scss";
import { Button } from "reactstrap";

const ReactStrapButton = (reactStrapButtonProps: ReactStrapButtonProps) => {
    
    const { id, type } = reactStrapButtonProps;

    // todo: continue configuring:
    return (
        <>
            <Button id={id} type={type} />
        </>
    )
}

export default ReactStrapButton;