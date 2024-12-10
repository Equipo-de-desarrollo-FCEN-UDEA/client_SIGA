"use client";
import { useState, useEffect } from "react";
import VotingTable from '@modules/voting/pages/VotingTable';

export default function Home() {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="md:w-2/3">
          <VotingTable votings={votings} />
        </div>
        
      )}
    </div>
  );
}