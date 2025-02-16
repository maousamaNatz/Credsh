import React from 'react';
import DashboardLayout from '@/Layouts/dashboardLayouts';
import { router } from '@inertiajs/react';

const Transactions = ({ transactions }) => {
    const handleStatusChange = (transaction, status) => {
        router.put(route('admin.transactions.update', transaction.id), {
            status: status
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Transactions</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vendor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.data.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    #{transaction.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {transaction.user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {transaction.vendor.nama}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Rp {transaction.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={transaction.status}
                                        onChange={(e) => handleStatusChange(transaction, e.target.value)}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(transaction.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

Transactions.layout = page => <DashboardLayout children={page} />

export default Transactions;
