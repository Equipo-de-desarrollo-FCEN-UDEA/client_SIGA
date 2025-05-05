"use client";

import { useState, useEffect } from "react";
import UsersTable from "@/modules/admin/pages/UsersTable";
import User from "@/core/interfaces/user";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UsersResponse {
  total: number;
  pages: number;
  users: User[];
}

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
        console.log(data);
        
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [offset]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto">
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
