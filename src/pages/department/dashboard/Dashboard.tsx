import React from 'react';
import RequestHistory from './RequestHistory';
import OrderOverview from './OrderOverview';
import BudgetLimit from './BudgetLimit';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 p-8 ml-64">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <OrderOverview/>
        </div>
        <div>
          <BudgetLimit />
        </div>
      </div>

      <div>
        <RequestHistory />
      </div>
    </div>
  );
};

export default Dashboard;