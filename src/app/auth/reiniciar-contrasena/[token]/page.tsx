import ResetPassword from "@/modules/auth/pages/ResetPassword";

const page = () => {
  return (
    <div className="grid place-items-center mt-10">
      <ResetPassword params={{ token: "your-token-here", new_password: "your-new-password-here" }}/>
    </div>
  );
};

export default page;
