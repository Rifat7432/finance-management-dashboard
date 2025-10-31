/* eslint-disable @typescript-eslint/no-explicit-any */
import SpendingOverview from "@/components/layout/spending";
import React from "react";

const Page = async ({ params }: any) => {
  const { userId } = await params;
  return (
    <div>
      <SpendingOverview userId={userId as string} />
    </div>
  );
};

export default Page;
