"use client";
import React, { useEffect, useState } from "react";

import VotingService, { fetchVotingById } from "@/core/services/api/voting/votingService";
import { fetchVoteTypes, assignUserVoteToVoting } from "@/core/services/api/voting/voteService";
import InfoUserItem from "@modules/admin/components/atoms/InfoUserItem";
import Statuses from "@/modules/voting/components/molecules/statuses";

import Voting from "@/core/interfaces/voting/voting";
import MainButton from "@/components/atoms/buttons/MainButton";
import Modal from "@/components/templates/Modal";
import SelectInput from "@/components/atoms/inputs/SelectInput";

import VotingChart from "@/modules/voting/components/molecules/results";

import Error from "@/components/atoms/errors/ErrorCode";
import Loading from "@/components/atoms/loading/Loading";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import { useSession } from "@/core/providers/SessionProvider";


const VotingDetail = ({ id }: { id: string}) => {
    const [voting, setVoting] = useState<Voting | null>(null);
    const [modal, setModal] = useState(false);
    const [vote_types, setVoteTypes] = useState([]);
    const [vote_type_id, setVote] = useState("");
    const [voting_id, setVotingId] = useState("");
    const [error, setError] = useState<number | null>(null);

    const {user} = useSession();

    const votingService = new VotingService();
    
    useEffect(() => {
        const fetchData = async () => {
            const data_voting = await fetchVotingById(id);
            const data_vote_types = await fetchVoteTypes();
            if (data_voting === 401) {
                setError(401);
            }
            else {
                setVoting(data_voting);
                setVotingId(data_voting.id);
                setVoteTypes(data_vote_types);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async () => {
        const votingData = {
            voting_id,
            vote_type_id
        };

        assignUserVoteToVoting(JSON.stringify(votingData));
    };

    const closeVoting = async () => {
        votingService.closeVoting(voting_id);
        window.location.reload();
    };

    if (error) {
        return <Error code={error} message="No Autorizado" />;
    }

    if (!voting || Object.keys(voting).length === 0) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-4 justify-center items-center">
                <div className="mt-14 max-w-3xl w-full md:w-[650px] md:h-full border shadow-lg p-10 rounded-md">
                    <h2 className="text-xl font-bold mb-3">Detalle de la votación</h2>

                    <div className="flex flex-col md:flex-row justify-between">
                        <div>
                            <InfoUserItem title="tipo de solicitud" text={voting.user_application.application.name} />
                            <InfoUserItem title="Solicitante" text={voting.user_application.user.name + " " + voting.user_application.user.last_name} />
                        </div>
                    </div>
                    <div>
                        <Statuses statuses={voting.info_voting.statuses} />
                    </div>
                    <div>
                        <VotingChart votes={voting.votes} />
                    </div>

                    {voting.info_voting.statuses.at(-1)?.result == "PENDIENTE" && (
                    <MainButton text="Votar" onClick={() => setModal(true)} />
                    )}

                    {user?.scopes.includes("representante:"+voting.academic_unit_id) && voting.info_voting.statuses.at(-1)?.result == "PENDIENTE" &&(
                    <div className="mt-2">
                        <SecondaryButton text="Cerrar votación" onClick={() => closeVoting()} />
                    </div>
                    )}
                    
                </div>
            </div>
            {modal && (
                <Modal setModal={() => setModal(false)}>
                    <h2 className="text-xl font-bold text-center my-3">Votar</h2>
                    <form className="mb-4 flex flex-col gap-3">
                        <SelectInput
                            value={vote_type_id}
                            onChange={(e) => setVote(e.target.value)}
                            options={vote_types.map((vote_type: any) => vote_type.name)}
                            valueOptions={vote_types.map((vote_type: any) => vote_type.id)}
                            label="Seleccionar un tipo de voto:"
                            placeholder="Seleccione una opción...."
                        />
                    </form>
                    
                    <div className="mt-16">
                        <MainButton text="Guardar" onClick={handleSubmit} />
                    </div>
                </Modal>
            )}
        </>
    )
}

export default VotingDetail;
