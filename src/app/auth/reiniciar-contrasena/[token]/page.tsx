import ResetPassword from "@/modules/auth/pages/ResetPassword";

const Page = ({ params }: { params: { token: string } }) => {
  return (
    <div className="flex justify-center items-start min-h-screen pt-20">
      <ResetPassword params={params} />
    </div>
  );
};

export default Page;