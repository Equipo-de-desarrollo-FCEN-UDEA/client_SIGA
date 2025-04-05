"use client";
import { useEffect, useState } from "react";
import Table from "@/components/organisms/Table";
import UserApplicationService from "@/core/services/api/applications/user_application";
import UserApplication from "@/core/interfaces/applications/userApplication";
import { UUID } from "crypto";

const MyApplications = () => {
    const [userApplications, setUserApplications] = useState<UserApplication[] | null>(null);
    const [rows, setRows] = useState<string[][]>([]);
    const headers = ['Consecutivo','Solicitante', 'Tipo', 'Estado', 'Acción'];


    useEffect(() => {
        const userApplicationService = new UserApplicationService();
        const fetchData = async () => {
            const data = await userApplicationService.getMyApplications();
            setUserApplications(data);
        };
        fetchData();
    }, []);

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

            ])});
            setRows(newRows);
        }
    }, [userApplications]);

    return (
        <div className="p-10 mx-auto my-3">
            <Table headers={headers} rows={rows} link={true} />
        </div>
    )
}

export default MyApplications