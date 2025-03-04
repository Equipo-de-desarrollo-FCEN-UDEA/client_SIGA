"use client";

import LoginHeader from "@/modules/auth/components/molecules/LoginHeader";
import LoginForm from "@/modules/auth/components/molecules/LoginForm";

const Login = () => (
    <div className="max-w-[437px] border shadow-lg p-10 rounded-md">
      <LoginHeader />
      <LoginForm />
    </div>
  );

export default Login;
