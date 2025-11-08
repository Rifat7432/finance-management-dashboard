import { DashboardLayout } from '@/components/layout/dashboard-layout';
import ContentPage from '@/components/pages/content/ContentPage';
import React from 'react';

const ContentManagement = () => {
  return (
    <div>
       <DashboardLayout><ContentPage/></DashboardLayout>
      
    </div>
  );
};

export default ContentManagement;