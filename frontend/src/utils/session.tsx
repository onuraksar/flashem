import store from "../stores/store";

export const isAuthorized = () => {
    if (store.getState()?.user?.user?.id) {
        return true;
    }
    return false;
}