import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";

interface NavButtonProps {
    label: string;
    href?: string; // Si es un botón, href será opcional
    icon?: React.ReactNode;
    isActive?: boolean;
    isExpanded?: boolean;
    iconPosition?: "left" | "right";
    className?: string;
    onClick?: () => void; // Para botones sin navegación
}

export const NavButton: React.FC<NavButtonProps> = ({
    label,
    href,
    icon,
    isActive = false,
    isExpanded = true,
    iconPosition = "left",
    onClick,
    className = "",
}) => {
    const content = (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition
                        ${isActive ? "text-green-700 font-semibold hover:bg-gray-200" : "hover:bg-gray-200 text-gray-800"}
                        ${isExpanded ? "justify-start gap-3 hover:bg-gray-200" : "justify-center w-12 h-12"}
                        ${className}
            `}
        >
            {iconPosition === "left" && icon}
            {isExpanded && <span>{label}</span>}
            {iconPosition === "right" && icon}
        </button>
    );

    let contentWithLink = content;
    if (href) {
        contentWithLink = (
            <Link href={href} className="w-full">
                {content}
            </Link>
        );
    }

    if (isExpanded) {
        return contentWithLink;
    }

    return (
        <Tooltip.Provider delayDuration={70}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    {href ? (
                        <Link href={href} className="w-full flex justify-center">
                            {content}
                        </Link>
                    ) : (
                        <button className="w-full flex justify-center" onClick={onClick}>
                            {content}
                        </button>
                    )}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="left"
                        sideOffset={10}
                        className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md"
                    >
                        {label}
                        <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};
