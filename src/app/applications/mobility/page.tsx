import { useState, useEffect } from "react";


export default function Home() {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const response = await fetch("http://localhost:8003/api/v1/user?skip=0&limit=286", {
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
        <h1></h1>
      )}
    </div>
  );
}