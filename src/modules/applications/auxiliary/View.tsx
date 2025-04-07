'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from '@/core/providers/SessionProvider'
import Table from '@/components/organisms/Table'
import UserApplication from '@/core/interfaces/applications/userApplication'
import UserApplicationService from '@/core/services/api/applications/user_application'
import { UUID } from 'crypto'

const Page = () => {
  const [userApplications, setUserApplications] = useState<UserApplication[] | null>(null);
  const [rows, setRows] = useState<string[][]>([]);
  const headers = ['Consecutivo', 'Solicitante', 'Tipo', 'Estado', 'Acción'];
  const { user } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userApplicationService = new UserApplicationService();
    const fetchData = async () => {
      if (user) {
        const data = await userApplicationService.getToUser(user.id);
        setUserApplications(data);
      }
    };
    fetchData();
  }, [user?.id]);

  // Nuevo useEffect que se activa cuando userApplications cambia
  useEffect(() => {
    if (userApplications) {

      const newRows = userApplications.map((userApplication) => {
        const type = userApplication.application.name.toLowerCase();
        return ([
          `${userApplication.consecutive}`,
          `${userApplication.user.name} ${userApplication.user.last_name}`,
          userApplication.application.name,
          userApplication.user_application_status[0].status.description,
          `/solicitudes/${type}/ver/${userApplication.id}`,

        ])
      });
      setRows(newRows);
    }
    setLoading(false);
  }, [userApplications]);

  return (
    <div>
      <Table headers={headers} rows={rows} link={true}/>
    </div>
  )
}

export default Page
