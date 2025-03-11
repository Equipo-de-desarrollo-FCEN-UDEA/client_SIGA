"use client";
import React, { useState } from 'react'
import { useSession } from '@/core/providers/SessionProvider'
import { PiSignOutBold, } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { NavItems, SideNavItem } from '@/components/molecules/Navitem/Navitem';
import * as Tooltip from "@radix-ui/react-tooltip";

const Sidebar = () => {
    const { user, logout: signOut } = useSession();
    const [showOptions, setShowOptions] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const navItems = NavItems();
    const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

    if (user != null) {
        return (
            <div className={`flex 
              ${isSidebarExpanded ? "w-[230px]" : "w-[68px]"}
              transition-all duration-300 ease-in-out`}>
                <aside className="h-screen w-[230px] bg-gray-50 border-r border-gray-300 
                                  flex flex-col justify-between p-4 shadow-sm shadow-gray-600">

                    <div className={`flex flex-col gap-3 transition-all duration-300 ease-in-out items-center`}>
                        <RiShieldUserLine size={60} color="green" />
                        <span className="font-semibold text-gray-800 tracking-wide">
                            {user.name} {user.last_name}
                        </span>
                        <button
                            className={`flex items-center w-full px-4 py-2 rounded-lg font-semibold
                                        text-gray-800 hover:bg-gray-200 transition-all 
                                        ${isSidebarExpanded ? "justify-center" : "justify-center w-15 h-15 p-0"}
                                        ${showOptions ? "text-green-700 bg-gray-200" : ""}
                            `}
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            {isSidebarExpanded ? (
                                <span className="w-full flex items-center justify-center gap-2">
                                    Crear solicitud
                                    <IoIosArrowDown size={20} />
                                </span>
                            ) : (
                                <Tooltip.Provider delayDuration={70}>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <button className="flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                                                <IoIosArrowDown size={25} />
                                            </button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                side="left"
                                                sideOffset={10}
                                                align="center"
                                                className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md"
                                            >
                                                Crear solicitud
                                                <Tooltip.Arrow className="fill-gray-800" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                                
                            )}
                        </button>

                        {/* Sección de opciones, solo se muestra si showOptions es true */}
                        {showOptions && (
                            <div className="relative pb-4">
                                <div className="flex flex-col space-y-3">
                                    {navItems.map((item) => (
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
                        )}

                    </div>
                    <button
                        className={`flex items-center rounded-lg transition-all text-gray-800 
                                      hover:bg-gray-200 w-full ${isSidebarExpanded ? "px-4 py-2 gap-2 justify-center" : "w-12 h-12 p-0 justify-center"
                            }`}
                        onClick={signOut}
                    >
                        <PiSignOutBold size={20} color="red" />
                        {isSidebarExpanded && <span>Cerrar Sesión</span>}
                    </button>
                </aside>

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