"use client";
import React from 'react';

interface BodyProps {
    rows: string[][];
    link?: boolean;
}

const Body = ({ rows, link }: BodyProps) => (
    <tbody>
        {rows.map((row) => (
            <tr key={row[row.length-1]}>
                {row.slice(0, -1).map((cell) => (
                    <td key={cell}>{cell}</td>
                ))}
                {link && (
                    <td>
                        <a href={row[row.length - 1]}>Ver detalles</a>
                    </td>
                )}
            </tr>
        ))}
    </tbody>
);

export default Body;