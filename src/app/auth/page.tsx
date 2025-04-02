"use client"

import Login from '@modules/auth/pages/Login'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/core/providers/SessionProvider';
import { useLoading } from '@/core/providers/LoadingProvider';

const Page = () => {
  const { user } = useSession();
  const router = useRouter();
  const {setLoading} = useLoading();

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);


  
    return (
      <div className='flex w-full justify-center items-center mt-10'>
        <Login />
      </div>
    )
  
}

export default Page;
