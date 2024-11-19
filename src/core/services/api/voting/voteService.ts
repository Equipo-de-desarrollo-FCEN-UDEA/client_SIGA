const apiUrl = process.env.NEXT_PUBLIC_API_URL+"/api/v1";

export const fetchVoteTypes= async () => {
    try {
      const response_vote_types = await fetch(
        apiUrl + "/vote_type"
      );
      const data_vote_types = await response_vote_types.json();
  
      return data_vote_types;
    } catch (error) {
      console.error("Error obteniendo los tipos de votos: " + error);
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
        const responseData = await response.json();
        console.log("Datos enviados con éxito: ", responseData);
        window.location.reload();
      }
  
      return response;
    } catch (error) {
      console.error("Error al asignar el voto del usuario: ", error);
    }
  };