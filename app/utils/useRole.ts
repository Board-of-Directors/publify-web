import {jwtDecode} from "jwt-decode";

export const useRole = () => {

    const jwt = jwtDecode(localStorage.getItem("ACCESS_TOKEN")!!) as any;

    const isCopyrighter = jwt.role === 'COPYRIGHTER';
    const isIllustrator = jwt.role === 'ILLUSTRATOR';
    const isOwner = jwt.role === "OWNER";
    const isEditor = jwt.role === 'EDITOR';

    return {
        isCopyrighter, isIllustrator,
        isOwner, isEditor
    }

}