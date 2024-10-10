import UserDetail from "@/modules/admin/pages/UserDetail";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <UserDetail id={params.id} />
    </>
  );
}
