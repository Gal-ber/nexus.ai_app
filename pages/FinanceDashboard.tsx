import React, { useMemo } from 'react';
import Card from '../components/Card.tsx';
import { USERS, CUSTOMERS, DEALS, COMMISSION_RATE, FINANCE_FORECAST_DATA, DEAL_VALUE_FUNNEL_DATA } from '../constants.ts';
import { Customer, DealStage } from '../types.ts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';
import { Trophy, Star, TrendingUp, Users } from 'lucide-react';

const FinanceDashboard: React.FC = () => {
    const tickColor = '#6b7280';
    const gridColor = '#e5e7eb';

    const topCustomers = useMemo(() => {
        const strategicValueMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
        
        return CUSTOMERS.map(customer => {
            const score = (customer.arr / 1000) * 0.5 + customer.employeeCount * 0.2 + (strategicValueMap[customer.strategicValue] || 0) * 0.3;
            return { ...customer, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }, []);

    const commissionData = useMemo(() => {
        const salesReps = USERS.filter(u => u.role.includes('Sales'));
        
        return salesReps.map(rep => {
            const closedDeals = DEALS.filter(deal => deal.salesOwnerId === rep.id && deal.stage === DealStage.CLOSED_WON);
            const totalSales = closedDeals.reduce((sum, deal) => sum + deal.value, 0);
            const commission = totalSales * COMMISSION_RATE;
            return {
                repId: rep.id,
                repName: rep.name,
                totalSales,
                commission,
            };
        }).filter(data => data.totalSales > 0);
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Finance Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                 <Card title="Revenue Forecast vs. Actuals">
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={FINANCE_FORECAST_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="name" tick={{ fill: tickColor }} />
                                <YAxis tickFormatter={(value) => `$${value / 1000}k`} tick={{ fill: tickColor }} />
                                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Line type="monotone" dataKey="forecast" stroke="#8884d8" strokeWidth={2} name="Forecast" />
                                <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} name="Actual" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Sales Pipeline Funnel by Value">
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <FunnelChart>
                                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                                <Funnel
                                    dataKey="value"
                                    data={DEAL_VALUE_FUNNEL_DATA}
                                    isAnimationActive
                                >
                                    <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                                </Funnel>
                            </FunnelChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Top 10 Strategic Customers">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Rank</th>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Customer</th>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">ARR</th>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Size</th>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Potential</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topCustomers.map((customer, index) => (
                                    <tr key={customer.id} className="border-b last:border-0">
                                        <td className="p-3 text-gray-800 font-bold">
                                            {index === 0 ? <Trophy className="text-yellow-500" /> : `#${index + 1}`}
                                        </td>
                                        <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                                        <td className="p-3 text-gray-600">${customer.arr.toLocaleString()}</td>
                                        <td className="p-3 text-gray-600 flex items-center"><Users size={14} className="mr-1" />{customer.employeeCount.toLocaleString()}</td>
                                        <td className="p-3 text-gray-600 flex items-center">
                                            <Star size={14} className={`mr-1 ${customer.strategicValue === 'High' ? 'text-green-500' : 'text-yellow-500'}`} />
                                            {customer.strategicValue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <Card title="Quarterly Sales Commissions Forecast">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Sales Rep</th>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Total Closed Sales</th>
                                    <th className="p-3 font-semibold text-gray-600 text-sm">Commission</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissionData.map(data => (
                                    <tr key={data.repId} className="border-b last:border-0">
                                        <td className="p-3 font-medium text-gray-800">{data.repName}</td>
                                        <td className="p-3 text-gray-600">${data.totalSales.toLocaleString()}</td>
                                        <td className="p-3 text-green-600 font-bold">${data.commission.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-xs text-gray-500 mt-2 text-right">Based on a {COMMISSION_RATE * 100}% commission rate on closed-won deals this quarter.</p>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default FinanceDashboard;
