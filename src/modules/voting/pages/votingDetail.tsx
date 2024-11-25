"use client";
import React, { useEffect, useState } from "react";

import { fetchVotingById } from "@/core/services/api/voting/votingService";
import { fetchVoteTypes, assignUserVoteToVoting } from "@/core/services/api/voting/voteService";
import InfoUserItem from "@modules/admin/components/atoms/InfoUserItem";
import Statuses from "../components/molecules/statuses";

import Voting from "@/core/interfaces/voting/voting";
import MainButton from "@/components/atoms/buttons/MainButton";
import Modal from "@/components/templates/Modal";
import SelectInput from "@/components/atoms/inputs/SelectInput";

import VotingChart from "../components/molecules/results";
import vote from "@/core/interfaces/voting/vote";
import { toast } from "react-toastify";

import Error from "@/components/atoms/errors/error";
import Loading from "@/components/atoms/loading/Loading";


function VotingDetail({ id }: { id: string | string[] }) {
    const [voting, setVoting] = useState<Voting | null>(null);
    const [modal, setModal] = useState(false);
    const [vote_types, setVoteTypes] = useState([]);
    const [vote_type_id, setVote] = useState("");
    const [voting_id, setVotingId] = useState("");
    const [error, setError] = useState<number | null>(null);
    
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

    if (error) {
        return <Error errorCode={error} />;
    }

    if (!voting || Object.keys(voting).length === 0) {
        return <Loading />;
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
                        <Statuses statuses={voting.info_voting.statuses} />
                    </div>
                    <div>
                        <VotingChart votes={voting.votes} />
                    </div>
                    <MainButton text="Votar" onClick={() => setModal(true)} />
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