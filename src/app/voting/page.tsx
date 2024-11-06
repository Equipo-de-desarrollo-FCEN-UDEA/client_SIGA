"use client";
import { useState, useEffect } from "react";
import VotingTable from '@modules/voting/pages/VotingTable';

export default function Home() {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const response = await fetch("http://localhost:8003/api/v1/voting", {
          credentials: "include",
        });
        const data = await response.json();
        setVotings(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-2/3 mx-auto">
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <VotingTable votings={votings} />
      )}
    </div>
  );
}