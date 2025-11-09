import React from 'react';
import Card from '../components/Card.tsx';
import KPICard from '../components/KPICard.tsx';
import { MARKETING_KPIS, LEAD_FUNNEL_DATA } from '../constants.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketingDashboard: React.FC = () => {
  const tickColor = '#6b7280';
  const gridColor = '#e5e7eb';

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Marketing Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MARKETING_KPIS.map(kpi => <KPICard key={kpi.title} kpi={kpi} />)}
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Marketing Funnel">
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={LEAD_FUNNEL_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis type="number" tick={{ fill: tickColor }} />
                            <YAxis type="category" dataKey="name" width={80} tick={{ fill: tickColor }} />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#e5e7eb',
                                }}
                                labelStyle={{ color: '#1f2937' }}
                            />
                            <Legend wrapperStyle={{ color: tickColor }} />
                            <Bar dataKey="value" fill="#8884d8" name="Count" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card title="Campaign Performance">
                 <div className="h-96 flex items-center justify-center text-gray-400">
                    <p>Additional marketing chart would go here (e.g., ROI by channel).</p>
                </div>
            </Card>
        </div>
    </div>
  );
};

export default MarketingDashboard;