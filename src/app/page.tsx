import { DashboardLayout } from "@/components/layout/dashboard-layout";
import HomePage from "@/components/pages/dashboard/HomePage";
import React from "react";

const Home = () => {
  return (
    <div>
      <DashboardLayout>
        <HomePage />
      </DashboardLayout>
    </div>
  );
};

export default Home;
