"use client";
import React from 'react';

interface HeadProps {
    headers: string[];
}

const Head: React.FC<HeadProps> = ({ headers }) => {
    return (
        <thead>
            <tr>
                {headers.map((header) => (
                    <th key={header} className="px-6 py-3 font-semibold">{header}</th>
                ))}
            </tr>
        </thead>
    );
};

export default Head;