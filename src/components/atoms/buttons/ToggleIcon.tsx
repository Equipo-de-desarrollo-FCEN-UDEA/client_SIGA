import React from "react";

interface ToggleIconProps {
    isActive: boolean;
    iconOn: React.ReactNode;
    iconOff: React.ReactNode;
    sizeOn?: number;
    sizeOff?: number;
    colorOn?: string;
    colorOff?: string;
    className?: string;
}

export const ToggleIcon: React.FC<ToggleIconProps> = ({
    isActive,
    iconOn,
    iconOff,
    sizeOn = 24,
    sizeOff = 24,
    colorOn = "currentColor",
    colorOff = "currentColor",
    className = "", 
}) => {
    const icon = isActive ? iconOn : iconOff;
    const size = isActive ? sizeOn : sizeOff;
    const color = isActive ? colorOn : colorOff;

    return (
        <span className={`${className}`}>
            {React.cloneElement(icon as React.ReactElement, { size, color })}
        </span>
    );
}