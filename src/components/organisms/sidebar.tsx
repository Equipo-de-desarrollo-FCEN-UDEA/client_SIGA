"use client";
import React from 'react'
import { useSession } from '@/core/providers/SessionProvider'
import { PiSignOutBold } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";

const Sidebar = () => {
    const { user } = useSession();
    if (user != null) {
        return (
            <div className='flex bg-gray w-[350px] shadow-sm shadow-gray-600'>
                <aside className="flex-1 h-screen sticky top-0">
                    <div className="flex flex-col mx-auto items-center gap-1 my-8">
                        <RiShieldUserLine size={100} color='green' />
                        <span className='font-thin text-gray-800 tracking-[0.1em] pt-2'>{user.name} {user.last_name}</span>
                        <div className='flex items-center gap-x-2 cursor-pointer'>
                            <p>Cerrar Sesión</p>
                            <PiSignOutBold
                                onClick={() => signOut()}
                            />
                        </div>
                        

                    </div>
                </aside>
            </div>
          )
    }
  
}

export default Sidebar