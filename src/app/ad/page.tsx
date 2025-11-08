
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import AdManagementPage from '@/components/pages/Ad/AdPage';
import React from 'react';

const AdManagement = () => {
  return (
    <div>
       <DashboardLayout> <AdManagementPage/></DashboardLayout>
     
    </div>
  );
};

export default AdManagement;