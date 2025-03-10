"use client";
import React, { useState } from 'react'
import { useSession } from '@/core/providers/SessionProvider'
import { PiSignOutBold, } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { NavApplications, NavLinks, SideNavItem } from '@/components/molecules/Navitem/Navitem';
import { NavButton } from '../atoms/buttons/NavButton';

const Sidebar = () => {
    const { user, logout: signOut } = useSession();
    const [showOptions, setShowOptions] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const navApplications = NavApplications();
    const navLinks = NavLinks();
    const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

    if (user != null) {
        return (
            <div className={`flex 
              ${isSidebarExpanded ? "w-[230px]" : "w-[101px]"}
              transition-all duration-300 ease-in-out`}>
                <aside className="h-screen w-[230px] bg-gray-50 border-r border-gray-300 
                                  flex flex-col justify-between p-4 shadow-sm shadow-gray-600">

                    <div className={`flex flex-col gap-2 transition-all duration-300 ease-in-out items-center`}>
                        <RiShieldUserLine size={60} color="green" />
                        <span className="font-semibold text-gray-800 tracking-wide">
                            {user.name} {user.last_name}
                        </span>

                        <div className="w-full border-b border-gray-300 pb-4"></div>

                        {/*Botones de Home, perfil...*/}
                        <div className="relative pb-4 w-full">
                            <div className="flex flex-col items-start w-full">
                                {navLinks.map((item) => (
                                    <SideNavItem
                                        key={item.href}
                                        label={item.title}
                                        path={item.href}
                                        icon={item.icon}
                                        active={item.active}
                                        isSidebarExpanded={isSidebarExpanded}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="w-full border-b border-gray-300 pb-4"></div>

                        {/*Botón de crear solicitud*/}
                        <div className="items-start w-full">
                            <NavButton
                                label="Crear solicitud"
                                icon={showOptions ? <IoIosArrowUp size={isSidebarExpanded ? 20 : 25} />
                                    : <IoIosArrowDown size={isSidebarExpanded ? 20 : 25} />}
                                isActive={showOptions}
                                isExpanded={isSidebarExpanded}
                                iconPosition="right"
                                onClick={() => setShowOptions(!showOptions)}
                                className={`bg-gray-50 ${isSidebarExpanded ? "justify-between" : "justify-center"}`}
                            />


                            {/* Solicitudes, solo se muestra si showOptions es true */}
                            {showOptions && (
                                <div className="relative pb-4 w-full">
                                    <div className="flex flex-col items-start w-full">
                                        {navApplications.map((item) => (
                                            <SideNavItem
                                                key={item.href}
                                                label={item.title}
                                                path={item.href}
                                                icon={item.icon}
                                                active={item.active}
                                                isSidebarExpanded={isSidebarExpanded}
                                                className={"text-sm"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botón de cerrar sesión*/}
                    <NavButton
                        label="Cerrar Sesión"
                        icon={<PiSignOutBold size={25} color="red" />}
                        isActive={false}
                        isExpanded={isSidebarExpanded}
                        iconPosition="left"
                        onClick={signOut}
                        className={`hover:bg-gray-200 text-gray-800 w-full ${isSidebarExpanded ? "px-4 py-2 gap-2 justify-start"
                            : "w-12 h-12 p-0 justify-center"}
                            `}
                    />
                </aside>

                {/*Botón para expandir o contraer el sidebar*/}
                <div className="relative">
                    <button
                        type="button"
                        className="absolute bottom-40 right-[-12px] flex h-10 w-10 items-center 
                               justify-center rounded-full bg-green-700 text-white 
                               shadow-lg hover:bg-green-600 hover:shadow-xl 
                               transition-all duration-200 ease-in-out"
                        onClick={toggleSidebar}
                    >
                        {isSidebarExpanded ? (
                            <FaChevronCircleLeft size={24} />
                        ) : (
                            <FaChevronCircleRight size={24} />
                        )}
                    </button>
                </div>

            </div>
        )
    }
}

export default Sidebar