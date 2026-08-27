import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative z-10 min-h-[60vh] flex items-center justify-center px-4">
      <div className="neu-flat p-10 rounded-3xl text-center max-w-md w-full">
        <h1 className="text-3xl font-black text-[var(--text-primary)]">
          Hello {user?.name || user?.email || 'User'}
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
