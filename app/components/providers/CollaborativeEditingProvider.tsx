import {createContext, Dispatch, SetStateAction} from "react";
import {Client} from "@stomp/stompjs";
import {useCollaborativeEditing} from "@/app/utils/hooks/useCollaborativeEditing";

export type LockPayload = {
    email : string,
    layoutId : number
}

export type UserMousePosition = {
    x : number,
    y : number,
    email : string
}

type CollaborativeEditingContext = {
    client : Client | undefined,
    userEmail : string | undefined,
    lockedLayouts : LockPayload[],
    setLockedLayouts : Dispatch<SetStateAction<LockPayload[]>>,
    userMousePositions : UserMousePosition[]
}

const defaultValue : CollaborativeEditingContext = {
    client : undefined,
    userEmail : undefined,
    lockedLayouts : [],
    setLockedLayouts : () => {},
    userMousePositions : []
};

export const CollaborativeEditingContext = createContext<CollaborativeEditingContext>(defaultValue);

const CollaborativeEditingProvider = ({issueId, children} : {issueId : number, children : React.ReactNode}) => {

    const value = useCollaborativeEditing(issueId);

    return (
        <CollaborativeEditingContext.Provider value={value}>
            {children}
        </CollaborativeEditingContext.Provider>
    );
};

export default CollaborativeEditingProvider;

