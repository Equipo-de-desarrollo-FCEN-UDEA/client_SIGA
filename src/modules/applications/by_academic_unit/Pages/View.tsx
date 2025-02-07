"use client";
import UserApplicationAcademicUnit from "@/core/interfaces/applications/userApplicationAcademicUnit";
import UserApplicationAcademicUnitService from "@/core/services/api/applications/user_application_academic_unit";
import { useEffect, useState } from "react";
import Table from "@/components/organisms/Table";

type list = string[];

function Page({ id }: { id: string }) {
    const [userApplicationsAcademicUnit, setUserApplicationAcademicUnit] = useState<UserApplicationAcademicUnit[] | null>(null);
    const [rows, setRows] = useState<list[]>([]);
    const headers = ['Solicitante', 'Tipo', 'Estado', ''];

    useEffect(() => {
        const us_app_academic_unit = new UserApplicationAcademicUnitService();
        const fetchData = async () => {
            try {
                const data = await us_app_academic_unit.getUserApplicationAcademicUnitByAcademicUnit(id);
                setUserApplicationAcademicUnit(data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchData();
    }, [id]);

    // Nuevo useEffect que se activa cuando userApplicationsAcademicUnit cambia
    useEffect(() => {
        if (userApplicationsAcademicUnit) {
            const newRows = userApplicationsAcademicUnit.map((userApplicationAcademicUnit) => [
                userApplicationAcademicUnit.user_application.user.name,
                userApplicationAcademicUnit.user_application.application.name,
                userApplicationAcademicUnit.is_active ? 'Activo' : 'Inactivo',
                ""
            ]);
            setRows(newRows);
        }
    }, [userApplicationsAcademicUnit]);

    return (
        <>
            <h1>userApplications</h1>
            <div>
                <Table headers={headers} rows={rows} />
            </div>
        </>
    );
}

export default Page;
