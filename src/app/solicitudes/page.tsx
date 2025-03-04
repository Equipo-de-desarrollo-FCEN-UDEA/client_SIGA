"use client"
import { useState, useEffect } from "react";
import UsersTable from '@modules/admin/pages/UsersTable';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8003/api/v1/user?skip=0&limit=286", {
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
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto">
      <UsersTable users={users} />
    </div>
  );
}

export default Home;