import ResetPassword from "@/modules/auth/pages/ResetPassword";

const Page = ({ params }: { params: { token: string } }) => (
  <div className="flex w-full justify-center items-center mt-10">
    <ResetPassword params={params} />
  </div>
);

export default Page;