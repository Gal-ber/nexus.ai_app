import React, { useState } from 'react';
import KPICard from '../components/KPICard.tsx';
import Card from '../components/Card.tsx';
import { STRATEGY_KPIS, USERS, REGIONAL_QUOTAS } from '../constants.ts';
import { User } from '../types.ts';
import { Save } from 'lucide-react';

const StrategyDashboard: React.FC = () => {
    const initialSalesTeam = USERS.filter(u => u.role.includes('Sales'));
    const [salesTeam, setSalesTeam] = useState<User[]>(initialSalesTeam);
    const [targets, setTargets] = useState<Record<number, number | undefined>>(
        initialSalesTeam.reduce((acc, user) => {
            acc[user.id] = user.salesTarget;
            return acc;
        }, {} as Record<number, number | undefined>)
    );
    const [savedStates, setSavedStates] = useState<Record<number, boolean>>({});

    const handleTargetChange = (userId: number, value: string) => {
        const newTarget = value === '' ? undefined : parseInt(value, 10);
        setTargets(prev => ({ ...prev, [userId]: newTarget }));
        setSavedStates(prev => ({...prev, [userId]: false}));
    };
    
    const handleSaveTarget = (userId: number) => {
        setSalesTeam(prevTeam => prevTeam.map(user => 
            user.id === userId ? { ...user, salesTarget: targets[userId] } : user
        ));
        setSavedStates(prev => ({...prev, [userId]: true}));
         setTimeout(() => {
            setSavedStates(prev => ({...prev, [userId]: false}));
        }, 2000);
    };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Strategy Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STRATEGY_KPIS.map(kpi => <KPICard key={kpi.title} kpi={kpi} />)}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Sales Team Target Setting (Quarterly)">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 font-semibold text-gray-600 text-sm">Sales Rep</th>
                            <th className="p-3 font-semibold text-gray-600 text-sm">Current Target</th>
                            <th className="p-3 font-semibold text-gray-600 text-sm">Set New Target</th>
                            <th className="p-3 font-semibold text-gray-600 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesTeam.map(user => (
                            <tr key={user.id} className="border-b last:border-0">
                                <td className="p-3 font-medium text-gray-800">{user.name}</td>
                                <td className="p-3 text-gray-600">${(user.salesTarget || 0).toLocaleString()}</td>
                                <td className="p-3">
                                    <input 
                                        type="number"
                                        placeholder="Enter target"
                                        value={targets[user.id] || ''}
                                        onChange={(e) => handleTargetChange(user.id, e.target.value)}
                                        className="w-full p-1 border border-gray-300 rounded-md bg-white"
                                    />
                                </td>
                                <td className="p-3">
                                    <button 
                                        onClick={() => handleSaveTarget(user.id)}
                                        className={`flex items-center justify-center w-24 text-sm font-bold py-1 px-3 rounded-lg transition duration-300 ${savedStates[user.id] ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                        >
                                         {savedStates[user.id] ? 'Saved!' : <><Save size={14} className="mr-2"/> Save</>}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
        <Card title="Quarterly Quota Attainment by Region">
            <div className="space-y-4">
                {REGIONAL_QUOTAS.map(item => {
                    const attainment = (item.actual / item.quota) * 100;
                    return (
                        <div key={item.region}>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-gray-700">{item.region}</span>
                                <span className="text-sm font-medium text-gray-700">${item.actual.toLocaleString()} / ${item.quota.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{width: `${Math.min(attainment, 100)}%`}}
                                ></div>
                            </div>
                            <div className="text-right text-sm font-semibold text-blue-800 mt-1">{attainment.toFixed(1)}% Attained</div>
                        </div>
                    );
                })}
            </div>
        </Card>
      </div>

    </div>
  );
};

export default StrategyDashboard;