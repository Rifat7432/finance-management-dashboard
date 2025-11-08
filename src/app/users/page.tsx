import { DashboardLayout } from '@/components/layout/dashboard-layout';
import UserManagementPage from '@/components/pages/users/UserManagementPage';
import React from 'react';

const UserManagement = () => {
  return (
    <div>
       <DashboardLayout><UserManagementPage/></DashboardLayout>
     
    </div>
  );
};

export default UserManagement;