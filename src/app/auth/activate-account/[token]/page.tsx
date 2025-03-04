"use client";

import { useEffect, useState } from "react";
import { activateAccount } from "src/core/services/api/auth/activateAccountService";

const Page = ({ params }: { params: { token: string } }) => {
  const [error, setError] = useState<string | null>(null);

  const handleActivateAccount = async () => {
    try {
      await activateAccount(params.token);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    handleActivateAccount();
  }, );

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      Activando cuenta...
    </div>
  );
}

export default Page;