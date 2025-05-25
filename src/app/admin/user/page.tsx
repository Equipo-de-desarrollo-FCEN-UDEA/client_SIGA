"use client";

import { useState, useEffect } from "react";
import UsersTable from "@/modules/admin/pages/UsersTable";
import User from "@/core/interfaces/user";
import FilterSection, { FilterType } from "@/components/molecules/FilterSection/FilterSection";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UsersResponse {
  total: number;
  pages: number;
  users: User[];
}

const userFilterTypes: FilterType<{
  name: string;
  email: string;
  identification_number: string;
}>[] = [
  { id: "name", label: "Nombre", placeholder: "Buscar por nombre" },
  { id: "email", label: "Correo", placeholder: "Buscar por correo" },
  { id: "identification_number", label: "Número de ID", placeholder: "Buscar por número de ID" },
];

const Home = () => {
  const [users, setUsers] = useState<UsersResponse>({
    total: 0,
    pages: 0,
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/user?skip=${offset}&limit=${limit}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [offset]);

  const [filters, setFilters] = useState<{
    name?: string;
    email?: string;
    identification_number?: string;
  }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          skip: offset.toString(),
          limit: limit.toString(),
          ...(filters.name && { name: filters.name }),
          ...(filters.email && { email: filters.email }),
          ...(filters.identification_number && {
            identification_number: filters.identification_number,
          }),
        });

        const response = await fetch(`${apiUrl}/user?${params.toString()}`, {
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [offset, filters]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto mb-6">
      <h1 className="my-6 text-4xl font-bold text-center">Lista de Usuarios</h1>
      <FilterSection
        filterTypes={userFilterTypes}
        onFilter={(newFilters) => {
          setFilters(newFilters);
          setOffset(0);
        }}
      />
      <UsersTable
        users={users.users}
        currentPage={Math.floor(offset / limit) + 1}
        limit={limit}
        offSet={offset}
        pages={users.pages}
        total={users.total}
        onPageChange={(newPage) => {
          const newOffset = (newPage - 1) * limit;
          setOffset(newOffset);
        }}
      />
    </div>
  );
};

export default Home;
