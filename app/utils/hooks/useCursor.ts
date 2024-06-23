import {PerfectCursor} from "perfect-cursors"
import {useCallback, useLayoutEffect, useState} from "react";

export const useCursor = (cb: any, point ?: number[]) => {
    const [pc] = useState<PerfectCursor>(() => new PerfectCursor(cb));

    useLayoutEffect(() => {
        if (point) pc.addPoint(point)
        return () => pc.dispose()
    }, [pc])

    return useCallback((point: number[]) => pc.addPoint(point), [pc])
}