'use client';
import React from 'react'
import Sidebar from "@/components/organisms/sidebar";
import Navbar from "@/components/organisms/navbar";
import { useSession } from '@/core/providers/SessionProvider';

interface SessionLayoutProps {
  children: React.ReactNode;
}

const SessionLayout: React.FC<SessionLayoutProps> = ({ children }) => {
  const { user } = useSession();
  return (
    <div>
      <div className="flex">
        {user && (
        <>
          <div className="hidden sm:flex">
            <Sidebar />
          </div>
          <div className="sm:hidden">
            <Navbar />
          </div>
        </>
        )}
        {children}
      </div>
    </div>
  )
}

export default SessionLayout
