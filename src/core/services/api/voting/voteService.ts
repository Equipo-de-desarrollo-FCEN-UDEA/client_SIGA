const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchVoteTypes= async () => {
    try {
      const response_vote_types = await fetch(
        apiUrl + "/vote_type"
      );
      const data_vote_types = await response_vote_types.json();
  
      return data_vote_types;
    } catch (error) {
      throw new Error("Error obteniendo los tipos de votos: " + error);
    }
  };

  export const assignUserVoteToVoting = async (voteData: string) => {
    try {
      const response = await fetch(
        apiUrl + "/vote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: voteData,
        }
      );
      
      if (response.ok) {
        await response.json();
        window.location.reload();
      }
  
      return response;
    } catch (error) {
      throw new Error("Error al asignar el voto del usuario: " + error);
    }
  };