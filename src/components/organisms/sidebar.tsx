"use client";
import React, {useState} from 'react'
import { useSession } from '@/core/providers/SessionProvider'
import { PiSignOutBold } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { NavItems } from '@/components/molecules/Routes/routes'
// import { cn } from '@/lib/utils'
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from '@/components/ui/tooltip'

const Sidebar = () => {
    const { user, logout: signOut } = useSession();
    const [showOptions, setShowOptions] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const navItems = NavItems();
    const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

    if (user != null) {
        return (
            <div className={`flex bg-gray-50 shadow-sm shadow-gray-600 
              ${isSidebarExpanded ? "w-[250px]" : "w-[68px]"}
              transition-all duration-300 ease-in-out`}>
                <aside className="flex-1 h-screen sticky top-0">
                    <div className="flex flex-col mx-auto items-center gap-1 my-8">
                        <RiShieldUserLine size={100} color='green' />
                        <span className='font-thin text-gray-800 tracking-[0.1em] pt-2'>{user.name} {user.last_name}</span>
                        <div className='flex items-center gap-x-2 cursor-pointer' onClick={signOut}>
                            <p>Cerrar Sesión</p>
                            <PiSignOutBold />
                        </div>
                        <button 
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            Realizar solicitud
                        </button>
                    </div>
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