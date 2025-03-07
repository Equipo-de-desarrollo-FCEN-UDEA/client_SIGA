"use client";
import UserApplicationAcademicUnit from "@/core/interfaces/applications/userApplicationAcademicUnit";
import UserApplicationAcademicUnitService from "@/core/services/api/applications/user_application_academic_unit";
import { useEffect, useState } from "react";
import Table from "@/components/organisms/Table";

const Page = ({ id }: Readonly<{ id: string }>) => {
    const [userApplicationsAcademicUnit, setUserApplicationsAcademicUnit] = useState<UserApplicationAcademicUnit[] | null>(null);
    const [rows, setRows] = useState<string[][]>([]);
    const headers = ['Solicitante', 'Tipo', 'Estado', 'Acción'];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const us_app_academic_unit = new UserApplicationAcademicUnitService();
        const fetchData = async () => {
            const data = await us_app_academic_unit.getUserApplicationAcademicUnitByAcademicUnit(id);
            setUserApplicationsAcademicUnit(data);
        };
        fetchData();
    }, [id]);

    // Nuevo useEffect que se activa cuando userApplicationsAcademicUnit cambia
    useEffect(() => {
        if (userApplicationsAcademicUnit) {

            const newRows = userApplicationsAcademicUnit.map((userApplicationAcademicUnit) => {
            const type = userApplicationAcademicUnit.user_application.application.name.toLowerCase();
            return ([
                userApplicationAcademicUnit.user_application.user.name,
                userApplicationAcademicUnit.user_application.application.name,
                userApplicationAcademicUnit.is_active ? 'Activo' : 'Inactivo',
                `/solicitudes/${type}/ver/${userApplicationAcademicUnit.user_application.id}`,

            ])});
            setRows(newRows);
        }
        setLoading(false);
    }, [userApplicationsAcademicUnit]);

    if (!userApplicationsAcademicUnit && !rows && loading) {
        return <h1>Cargando...</h1>;
    }

    return (
        <div className="w-2/3 max-h-2/3  p-10 mx-auto my-3">
            <Table headers={headers} rows={rows} link={true} />
        </div>
    );
}

export default Page;
