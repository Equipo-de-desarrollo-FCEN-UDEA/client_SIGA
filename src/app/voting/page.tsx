"use client";
import { useState, useEffect } from "react";
import VotingTable from '@modules/voting/pages/VotingTable';
import SessionLayout from "@/components/layouts/SessionLayout";

const  Home = () => {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const response = await fetch(apiUrl+"/voting", {
          credentials: "include",
        });
        const data = await response.json();
        setVotings(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, [apiUrl]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <SessionLayout>
    <div className="flex flex-col items-center justify-center">
        <div className="md:w-2/3">
          <VotingTable votings={votings} />
        </div>
    </div>
    </SessionLayout>
  );
}

export default Home;