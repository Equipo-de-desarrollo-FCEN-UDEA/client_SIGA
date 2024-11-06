"use client";
import Voting from "@/core/interfaces/voting";
import Link from "next/link";
import { usePagination } from "pagination-react-js";
import Pagination from "@components/molecules/Pagination/index";

const VotingTable = ({ votings }: { votings: Voting[] }) => {
    // Hook to handle pagination
    const { records, pageNumbers, setActivePage, setRecordsPerPage } =
        usePagination({
            activePage: 1,
            recordsPerPage: 7,
            totalRecordsLength: votings.length,
            offset: 2,
            navCustomPageSteps: { prev: 3, next: 3 },
            permanentFirstNumber: true,
            permanentLastNumber: true,
        });

    // Function to update the active page in the paginator
    function updateActivePage(pageNumber: number | false) {
        pageNumber && setActivePage(pageNumber);
    }

    return (
        <div className="w-full flex flex-col items-center mt-4">
            <h1 className="font-bold text-2xl mb-2">Lista de Votaciones</h1>
            <table className="table-auto min-w-full border-collapse border border-slate-500 bg-white shadow-md rounded-lg overflow-scroll">
                <thead className="bg-darkGreen text-white">
                    <tr>
                        <th className="px-6 py-3 text-left font-semibold">Solicitante</th>
                        <th className="px-6 py-3 text-left font-semibold">Email</th>
                        <th className="px-6 py-3 text-left font-semibold">Solicitud</th>
                        <th className="px-6 py-3 text-left font-semibold">Fecha de solicitud</th>
                        <th className="px-6 py-3 text-left font-semibold">Opciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {votings.length > 0 ? (
                        votings
                            .slice(records.indexOfFirst, records.indexOfLast + 1)
                            .map((voting: Voting) => (
                                <tr
                                    key={voting.id}
                                    className="hover:bg-gray-100 transition-colors"
                                >
                                    <td className="px-6 py-4 border-b border-gray-300">{voting.user_application.user.name + " " +voting.user_application.user.last_name}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{voting.user_application.user.email}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{voting.user_application.application.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{new Date(voting.user_application.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">
                                        <Link 
                                            href={`/voting/${voting.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Ver detalles
                                        </Link>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center">
                                No hay votaciones disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                pageNumbers={pageNumbers}
                updateActivePage={updateActivePage}
            />
        </div>
    );
};

export default VotingTable;
