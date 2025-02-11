import View from "@modules/applications/mobility/pages/View";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <View id={params.id} />
  );
}