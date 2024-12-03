import React from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Voting from '@/core/interfaces/voting/voting';

const processData = (data: { vote_type: { name: string } }[]) => {
    const voteCounts: Record<string, number> = {};

    data.forEach((item) => {
        const voteType = item.vote_type.name;
        voteCounts[voteType] = (voteCounts[voteType] || 0) + 1;
    });

    return Object.entries(voteCounts).map(([name, value]) => ({ name, value }));
};

const VotingChart: React.FC<Voting> = ({ votes }) => {
    const processedVotes = processData(votes);
    const COLORS = ["#068a14", "#df0101"];

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-lg font-bold mb-3'>Resultados</h1>
            <PieChart width={400} height={400} className=''>
                <Pie
                    data={processedVotes}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {processedVotes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default VotingChart;
