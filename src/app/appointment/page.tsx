import { DashboardLayout } from '@/components/layout/dashboard-layout';
import AppointmentPage from '@/components/pages/appointment/AppointmentPage';
import React from 'react';

const AppointmentManagement = () => {
  return (
    <div>
       <DashboardLayout>
        <AppointmentPage/>
       </DashboardLayout>
    </div>
  );
};

export default AppointmentManagement;