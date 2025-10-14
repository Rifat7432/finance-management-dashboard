/* eslint-disable @typescript-eslint/no-explicit-any */
import ResetPassword from "@/components/pages/auth/ResetPassword";
import React from "react";

const ResetPasswordPage = async ({ searchParams }: { searchParams: any }) => {
  const { email, token } = await searchParams;
  return (
    <div>
      <ResetPassword email={email} token={token} />
    </div>
  );
};

export default ResetPasswordPage;
