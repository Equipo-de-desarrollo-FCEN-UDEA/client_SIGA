"use client";
import UserApplication from "@/core/interfaces/userApplication";
import UserApplicationAcademicUnitService from "@/core/services/api/applications/user_application_academic_unit";
import { useEffect, useState } from "react";


function Page({ id }: { id: string }) {
    const [userApplications, setUserApplication] = useState<UserApplication | null>(null);

    useEffect(() => {
        const us_app_academic_unit = new UserApplicationAcademicUnitService();
        const fetchData = async () => {
            try {
                const data = await us_app_academic_unit.getUserApplicationAcademicUnitByAcademicUnit(id);
                setUserApplication(data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
        console.log(userApplications)
    }, [id]);
    
    return (
        <>
            <p>Info de las movilidades</p>
        </>
    );
}

export default Page;