// import UserDetail from "@/modules/admin/pages/UserDetail";

export default function Page({ params }: { params: { token: string } }) {
  return (
    <>
      <h1>{params.token}</h1>
    </>
  );
}
