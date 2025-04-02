'use client';
import React, { use, useEffect } from 'react'
import Sidebar from "@/components/organisms/sidebar";
import Navbar from "@/components/organisms/navbar";
import { useSession } from '@/core/providers/SessionProvider';
import { useLoading } from '@/core/providers/LoadingProvider';
import Loading from '@/components/atoms/loading/Loading';

interface SessionLayoutProps {
  children: React.ReactNode;
}

const SessionLayout: React.FC<SessionLayoutProps> = ({ children }) => {
  const { user } = useSession();
  const {loading, setLoading} = useLoading();
  useEffect(() => {
    setLoading(false);
  }, [user]);
  if (loading) {
    return <Loading/>;
  }
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
