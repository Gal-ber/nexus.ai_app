import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card.tsx';
import { RECONCILIATION_CHART_DATA, RECONCILIATION_TABLE_DATA } from '../constants.ts';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; delta: string; icon: React.ReactNode }> = ({ title, value, delta, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <div className="flex items-center mt-2 text-sm text-gray-600">
            {icon}
            <span className="ml-1">{delta}</span>
        </div>
    </div>
);


const Reconciliation: React.FC = () => {
    const tickColor = '#6b7280';
    const gridColor = '#e5e7eb';

  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales vs. Finance Reconciliation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Closed Deals (CRM)" value="$20,950" delta="+5.2% from last month" icon={<ArrowUpRight className="text-green-500" />} />
            <StatCard title="Actual Revenue (ERP)" value="$19,726" delta="-1.8% from last month" icon={<ArrowDownRight className="text-red-500" />} />
            <StatCard title="Delta (Difference)" value="$1,224" delta="Variance: 5.8%" icon={<Minus className="text-yellow-500" />} />
        </div>
        
        <Card title="Revenue Trend (Last 7 Months)" className="mb-8">
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={RECONCILIATION_CHART_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="name" tick={{ fill: tickColor }} />
                        <YAxis tick={{ fill: tickColor }} />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                borderColor: '#e5e7eb',
                            }}
                            labelStyle={{ color: '#1f2937' }}
                        />
                        <Legend wrapperStyle={{ color: tickColor }} />
                        <Line type="monotone" dataKey="sales_forecast" stroke="#3b82f6" strokeWidth={2} name="Sales Forecast (CRM)" />
                        <Line type="monotone" dataKey="actual_revenue" stroke="#16a34a" strokeWidth={2} name="Actual Revenue (ERP)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
        
        <Card title="Deal Discrepancy Details">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Deal ID</th>
                            <th className="p-4 font-semibold text-gray-600">Deal Name</th>
                            <th className="p-4 font-semibold text-gray-600">Sales Amount</th>
                            <th className="p-4 font-semibold text-gray-600">Invoice ID</th>
                            <th className="p-4 font-semibold text-gray-600">Invoice Amount</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RECONCILIATION_TABLE_DATA.map((row) => (
                            <tr key={row.id} className="border-b border-gray-200 last:border-b-0">
                                <td className="p-4 text-gray-800">{row.id}</td>
                                <td className="p-4 font-medium text-gray-800">{row.dealName}</td>
                                <td className="p-4 text-gray-800">${row.salesAmount.toLocaleString()}</td>
                                <td className="p-4 text-gray-800">{row.invoiceId || 'N/A'}</td>
                                <td className="p-4 text-gray-800">{row.invoiceAmount ? `$${row.invoiceAmount.toLocaleString()}` : 'N/A'}</td>
                                <td className="p-4">
                                     <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                        row.status === 'Matched' ? 'bg-green-100 text-green-800' :
                                        row.status === 'Mismatch' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>

    </div>
  );
};

export default Reconciliation;