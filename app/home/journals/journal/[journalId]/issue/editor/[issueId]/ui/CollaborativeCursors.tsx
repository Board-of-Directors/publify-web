import React, {useCallback, useContext, useRef} from 'react';
import {CollaborativeEditingContext, UserMousePosition} from "@/app/components/providers/CollaborativeEditingProvider";
import Cursor from "@/app/components/svg/cursor/Cursor";
import {useCursor} from "@/app/utils/hooks/useCursor";
import Text from "@/app/components/atoms/text/Text";

const UserCursor = ({userMousePosition}: { userMousePosition: UserMousePosition }) => {
    const ref = useRef<HTMLDivElement>(null);

    const animateCursor = useCallback((point: number[]) => {
        const elm = ref.current
        if (!elm) return

        elm.style.setProperty(
            "transform",
            `translate(${point[0]}px, ${point[1]}px)`
        )
    }, [])

    const onPointMove = useCursor(animateCursor);

    React.useLayoutEffect(() => {
        onPointMove([userMousePosition.x, userMousePosition.y])
    }, [onPointMove, userMousePosition]);

    return (
        <div ref={ref} className={'flex flex-row gap-1 absolute z-40'}>
            <Cursor/>
            <Text text={userMousePosition.email} className={'text-sm'}/>
        </div>
    );
};

const CollaborativeCursors = () => {
    const {userMousePositions, userEmail} = useContext(CollaborativeEditingContext);

    return (
        <>
            {userMousePositions.filter(position => position.email !== userEmail).map((position, key) => (
                <UserCursor userMousePosition={position} key={key}/>
            ))}
        </>
    );
};

export default CollaborativeCursors;