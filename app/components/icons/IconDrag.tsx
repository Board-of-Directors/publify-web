import React from 'react';

const IconDrag = ({className, onClick, ref}: {
    ref ?: any,
    className ?: string,
    onClick ?: () => void
}) => {
    return (
        <svg ref={ref} onClick={onClick} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M3 15H21" stroke="#BCBCBC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 9H21" stroke="#BCBCBC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};

export default IconDrag;
