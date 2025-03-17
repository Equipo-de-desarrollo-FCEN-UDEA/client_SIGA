"use client";
import UserApplicationAcademicUnit from "@/core/interfaces/applications/userApplicationAcademicUnit";
import UserApplicationAcademicUnitService from "@/core/services/api/applications/user_application_academic_unit";
import { useEffect, useState } from "react";
import Table from "@/components/organisms/Table";
import UserApplicationService from "@/core/services/api/applications/user_application";
import UserApplication from "@/core/interfaces/applications/userApplication";
import { UUID } from "crypto";

const Page = ({ id }: Readonly<{ id: UUID }>) => {
    const [userApplicationsAcademicUnit, setUserApplicationsAcademicUnit] = useState<UserApplicationAcademicUnit[] | null>(null);
    const [userApplications, setUserApplications] = useState<UserApplication[] | null>(null);
    const [rows, setRows] = useState<string[][]>([]);
    const headers = ['Solicitante', 'Tipo', 'Estado', 'Acción'];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userApplicationService = new UserApplicationService();
        const fetchData = async () => {
            const data = await userApplicationService.getToAcademicUnit(id);
            setUserApplications(data);
        };
        fetchData();
    }, [id]);

    // Nuevo useEffect que se activa cuando userApplications cambia
    useEffect(() => {
        if (userApplications) {

            const newRows = userApplications.map((userApplication) => {
            const type = userApplication.application.name.toLowerCase();
            return ([
                `${userApplication.user.name} ${userApplication.user.last_name}`,
                userApplication.application.name,
                userApplication.user_application_status[0].status.description,
                `/solicitudes/${type}/ver/${userApplication.id}`,

            ])});
            setRows(newRows);
        }
        setLoading(false);
    }, [userApplications]);

    if (!userApplications && !rows && loading) {
        return <h1>Cargando...</h1>;
    }

    return (
        <div className="w-2/3 max-h-2/3  p-10 mx-auto my-3">
            <Table headers={headers} rows={rows} link={true} />
        </div>
    );
}

export default Page;
