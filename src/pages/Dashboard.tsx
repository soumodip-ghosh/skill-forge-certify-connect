import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard';

const Dashboard = () => {
  const [userType] = useState<'learner' | 'mentor' | 'recruiter'>('learner');

  return (
    <AppLayout>
      <DashboardComponent userType={userType} />
    </AppLayout>
  );
};

export default Dashboard;