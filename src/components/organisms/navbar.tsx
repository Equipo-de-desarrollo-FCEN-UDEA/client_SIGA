"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "@/core/providers/SessionProvider";
import { PiSignOutBold } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { NavApplications, NavLinks, SideNavItem } from "@/components/molecules/Navitem/Navitem";
import { NavButton } from "../atoms/buttons/NavButton";

const Navbar = () => {
    const { user, logout: signOut } = useSession();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const navApplications = NavApplications();
    const navLinks = NavLinks();
    const expand = () => setIsExpanded(!isExpanded);

    // Detectar la tecla Escape globalmente para cerrar el menú
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsExpanded(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!user) return null; // No renderiza nada si no hay usuario

    return (
        <>
            <div>
                {/* Fondo oscuro cuando la navbar está expandida */}
                {isExpanded && (
                    <button
                        type="button"
                        className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity"
                        onClick={() => setIsExpanded(false)}
                        onKeyDown={(e) => e.key === "Escape" && setIsExpanded(false)}
                        aria-label="Cerrar el menú"
                    ></button>
                )}
            </div>
            <div className="flex justify-between items-center">
                <div className={`fixed top-0 left-0 z-50 w-full bg-gray-50 
                shadow-md transition-all duration-300 ease-in-out 
                ${isExpanded ? "h-[180px] opacity-100"
                        : "h-0 opacity-0 overflow-hidden"}
                    `}>
                    <div className="flex items-center py-3">
                        <RiShieldUserLine size={30} color="green" />
                        <div className="md:flex flex-col ml-1 font-semibold text-sm text-gray-800 tracking-wide ">
                            <span> {user.name} {user.last_name} </span>
                        </div>
                        {/* Botón de Cerrar Sesión */}
                        <button
                            type="button"
                            className="flex items-center px-4 py-1 rounded-lg ml-auto"
                            onClick={signOut}
                        >
                            <PiSignOutBold size={20} color="red" className="mr-2" />
                        </button>
                    </div>
                    <div className="w-full border-b border-gray-300"></div>


                    {/* Links de navegación */}
                    <div className="flex flex-col sm:flex-row items-center">
                        {navLinks.map((item) => (
                            <SideNavItem
                                key={item.href}
                                label={item.title}
                                path={item.href}
                                icon={item.icon}
                                active={item.active}
                                isExpanded={true}
                                onClick={() => {
                                    setShowOptions(false);
                                    setIsExpanded(false);
                                }} />
                        ))}
                    </div>

                    {/* Botón de Crear Solicitud */}
                    <div className="relative">
                        <NavButton
                            label="Crear solicitud"
                            icon={showOptions ? <IoIosArrowUp size={20} />
                                : <IoIosArrowDown size={20} />}
                            isActive={showOptions}
                            isExpanded={isExpanded}
                            iconPosition="right"
                            onClick={() => setShowOptions(!showOptions)}
                            className="bg-gray-50 hover:bg-gray-200 px-4 py-2"
                        />

                        {/* Opciones desplegables de solicitudes */}
                        <div className={`absolute left-0 right-0 bg-white shadow-lg 
                        rounded-md mt-2 py-2 transition-all duration-300 ease-in-out
                        ${showOptions ? "opacity-100 translate-y-0 visible"
                                : "opacity-0 -translate-y-3 invisible"}`}
                        >
                            {navApplications.map((item) => (
                                <SideNavItem
                                    key={item.href}
                                    label={item.title}
                                    path={item.href}
                                    icon={item.icon}
                                    active={item.active}
                                    isExpanded={isExpanded}
                                    onClick={() => {
                                        setShowOptions(false);
                                        setIsExpanded(false);
                                    }}
                                />
                            ))}
                        </div>


                    </div>
                </div>

                {/* Botón de menú */}
                <div className="relative w-full">
                    <div className="relative w-full">
                        <button type="button"
                            className={`fixed bottom-40 right-4 z-50 flex 
                                items-center justify-center bg-white 
                                rounded-full border-8 shadow-lg transition-all 
                                duration-300 ease-in-out
                                ${isExpanded ? "h-14 w-14 border-green-600 text-green-600"
                                    : "h-12 w-12 border-green-700 text-green-700"}
                                    hover:bg-gray-100 hover:shadow-xl`}
                            onClick={() => {
                                setShowOptions(false);
                                expand();
                            }}>
                            <FaBars size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
