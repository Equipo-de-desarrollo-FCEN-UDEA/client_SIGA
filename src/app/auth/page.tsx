"use client"

import Login from '@modules/auth/pages/Login'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/core/providers/SessionProvider';

const Page = () => {
  const { user } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
        <p>Cargando...</p>
    ); // O puedes mostrar un spinner de carga aquí
  }
  else {
    return (
      <div className='grid place-items-center mt-10'>
        <Login />
      </div>
    )
  }
}

export default Page;
