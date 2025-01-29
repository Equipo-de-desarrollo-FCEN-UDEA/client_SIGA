" use client";

import ResetPasswordForm from "../components/molecules/ResetPasswordForm";

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  return (
    <div className="max-w-[437px] border shadow-lg p-10 rounded-md">
      <ResetPasswordForm token={params.token} />
    </div>
  );
};

export default ResetPasswordPage;