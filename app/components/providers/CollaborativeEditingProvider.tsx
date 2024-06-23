import {createContext} from "react";
import {Client} from "@stomp/stompjs";
import {useCollaborativeEditing} from "@/app/utils/hooks/useCollaborativeEditing";

export type LockPayload = {
    email : string,
    layoutId : number
}

type CollaborativeEditingContext = {
    client : Client | undefined,
    userEmail : string | undefined,
    lockedLayouts : LockPayload[]
}

const defaultValue : CollaborativeEditingContext = {
    client : undefined,
    userEmail : undefined,
    lockedLayouts : []
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

