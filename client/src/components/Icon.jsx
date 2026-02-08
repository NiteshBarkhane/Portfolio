import React from 'react';

const Icon = ({ path, name, size = 24, className = "" }) => {
    if (!path) return null;
    
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-label={name || "icon"}
        >
            <path d={path} />
        </svg>
    );
};

export default Icon;
