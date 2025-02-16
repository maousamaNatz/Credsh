import React from 'react';
import DashboardLayout from '@/Layouts/dashboardLayouts';
import { IconStats, IconUsers, IconCart } from '@/common/icons';

const StatsCard = ({ icon: Icon, title, value, color = "bg-blue-500" }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`${color} rounded-full p-3`}>
        <Icon size="w-8 h-8" color="text-white" />
      </div>
      <div className="ml-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

export default function Dashboard({ stats }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={IconUsers}
          title="Total Users"
          value={stats.total_users}
          color="bg-blue-500"
        />
        <StatsCard
          icon={IconCart}
          title="Total Bookings"
          value={stats.total_bookings}
          color="bg-green-500"
        />
        <StatsCard
          icon={IconStats}
          title="Revenue"
          value={`Rp ${stats.revenue.toLocaleString()}`}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}

Dashboard.layout = page => <DashboardLayout children={page} />
