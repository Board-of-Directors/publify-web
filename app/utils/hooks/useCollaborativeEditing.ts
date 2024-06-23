import {useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";
import {jwtDecode} from "jwt-decode";
import {LockPayload} from "@/app/components/providers/CollaborativeEditingProvider";

const BASE_URL = 'ws://158.160.10.240:8080';

export const useCollaborativeEditing = (issueId : number) => {

    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = {'Authorization' : `Bearer ${token}`};

    const [ lockedLayouts, setLockedLayouts ] = useState<LockPayload[]>([]);
    const [client, setClient] = useState<Client>();
    const {sub : userEmail} = jwtDecode(token!!);

    useEffect(() => {

        const client = new Client();

        const onConnect = () => {
            client.subscribe(`/topic/locked/${issueId}`, (message) => {
                const payload = JSON.parse(message.body) as LockPayload;
                setLockedLayouts(ids => [...ids, payload]);
                console.log('LOCK_EVENT', payload);
            }, headers)

            client.subscribe(`/topic/unlocked/${issueId}`, (message) => {
                const payload = JSON.parse(message.body) as LockPayload;
                setLockedLayouts(ids => ids.filter(item => item.layoutId !== payload.layoutId));
                console.log('UNLOCK_EVENT', payload);
            }, headers)
        }

        const onDebug = (msg : string) => console.log(new Date(), msg)

        client.configure({
            connectHeaders : headers,
            brokerURL: `${BASE_URL}/user/chat`,
            onConnect: onConnect,
            debug: onDebug
        })

        client.activate()
        setClient(client);

        return () => {
            client.deactivate();
        }

    }, []);

    return {client, lockedLayouts, userEmail};

}