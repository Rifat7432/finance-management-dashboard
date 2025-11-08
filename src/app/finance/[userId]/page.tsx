/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import SpendingOverview from "@/components/pages/finance/spending";
import React from "react";

const Page = async ({ params }: any) => {
  const { userId } = await params;
  return (
    <div>
      <DashboardLayout>
        <SpendingOverview userId={userId as string} />
      </DashboardLayout>
    </div>
  );
};


export default Page;