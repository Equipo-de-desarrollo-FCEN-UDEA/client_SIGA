"use client";
import React, { useEffect, useState } from "react";

import {fetchVotingById} from "@/core/services/api/voting/votingService";
import InfoUserItem from "@modules/admin/components/atoms/InfoUserItem";
import Statuses from "../components/molecules/statuses";

import Voting from "@/core/interfaces/voting";

function VotingDetail({id}: {id: string | string[]}) {
    const [voting, setVoting] = useState<Voting | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data_voting = await fetchVotingById(id);
            console.log(data_voting);
            setVoting(data_voting);
        };
        fetchData();
    }, [id]);

    if (!voting) {
        return <div>Cargando información de la votación...</div>;
    }

    return (
        <>
        <div className="flex flex-col md:flex-row md:flex-wrap md:gap-4 justify-center items-center">
            <div className="mt-14 max-w-3xl md:w-[650px] md:h-full border shadow-lg p-10 rounded-md">
                <h2 className="text-xl font-bold mb-3">Detalle de la votación</h2>

                <div className="flex justify-between">
                    <div>
                        <InfoUserItem title="tipo de solicitud" text={voting.user_application.application.name} />
                        <InfoUserItem title="Solicitante" text={voting.user_application.user.name + " " + voting.user_application.user.last_name} />
                    </div>
                    
                    
                </div>
                <div>
                    <Statuses statuses = {voting.info_voting.statuses} />
                </div>
                <button>votar</button>
            </div>
        </div>
        </>
    )
}

export default VotingDetail;