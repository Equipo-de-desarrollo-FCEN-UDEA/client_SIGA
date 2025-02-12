"use client";
import React from 'react';

type list = string[];
interface BodyProps {
    rows: list[];
}

const Body: React.FC<BodyProps> = ({ rows }) => {
    return (
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.map((cell) => (
                        <td key={cell} className="px-6 py-4 border-b border-gray-300">{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default Body;