import { useSelector } from "react-redux";

export const useIsAuthorized = () => {
    const user = useSelector((state: any) => state.user?.user);
    return !!user?.id;
};