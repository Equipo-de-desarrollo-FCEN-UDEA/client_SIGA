import VotingDetail from "@/modules/voting/pages/votingDetail";

const Page = ({ params }: { params: { id: string } }) => (
  <>
    <VotingDetail id={params.id} />
  </>
);


export default Page;