import VotingDetail from "@/modules/voting/pages/votingDetail";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <VotingDetail id={params.id} />
    </>
  );
}