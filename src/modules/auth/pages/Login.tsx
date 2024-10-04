"use client";

import LoginHeader from "../components/molecules/LoginHeader";
import LoginForm from "../components/molecules/LoginForm";

const Login = () => {
  return (
    <div className="max-w-[437px] border shadow-lg p-10 rounded-md">
      <LoginHeader />
      <LoginForm />
    </div>
  );
};

export default Login;
