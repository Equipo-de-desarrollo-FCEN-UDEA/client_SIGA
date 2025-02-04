"use client";
import React from 'react'
import { useSession } from '@/core/providers/SessionProvider'

const Sidebar = () => {
    const { user, login, logout } = useSession();

    if (user) {
        return (
            <div className='flex bg-gray w-[350px] shadow-sm shadow-gray-600'>
                <aside className="flex-1 h-screen sticky top-0">
                    Sidebar
                </aside>
            </div>
          )
    }
  
}

export default Sidebar