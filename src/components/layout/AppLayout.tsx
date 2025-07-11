import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AIAssistant } from '../ai/AIAssistant';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [userType] = useState<'learner' | 'mentor' | 'recruiter'>('learner');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar userType={userType} />
        <main className="flex-1 lg:pl-72">
          <div className="flex">
            <div className="flex-1 px-4 py-6 lg:px-8">
              {children}
            </div>
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
};