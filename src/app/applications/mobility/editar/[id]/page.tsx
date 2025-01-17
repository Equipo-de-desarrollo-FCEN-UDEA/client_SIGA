import Edit from "@modules/applications/mobility/pages/Edit";

export default function Page({params}: {params: {id: string}}) {
  return (
    <>
      <Edit id={params.id} />
    </>
  );
}