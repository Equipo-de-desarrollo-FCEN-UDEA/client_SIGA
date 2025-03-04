import UserDetail from "@/modules/admin/pages/UserDetail";

const Page = ({ params }: { params: { id: string } }) => (
  <>
    <UserDetail id={params.id} />
  </>
);



export default Page;