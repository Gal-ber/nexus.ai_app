import React from 'react';
import { KpiData } from '../types.ts';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const KPICard: React.FC<{ kpi: KpiData }> = ({ kpi }) => {
    const { title, value, change, changeType, description } = kpi;

    const TrendIcon = () => {
        switch (changeType) {
            case 'increase':
                return <ArrowUpRight className="w-4 h-4 text-green-500" />;
            case 'decrease':
                return <ArrowDownRight className="w-4 h-4 text-red-500" />;
            default:
                return <Minus className="w-4 h-4 text-gray-500" />;
        }
    };
    
    const changeColor = changeType === 'increase' ? 'text-green-500' : changeType === 'decrease' ? 'text-red-500' : 'text-gray-500';

    return (
        <div className="bg-white p-6 rounded-lg shadow-md" title={description}>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
            <div className="flex items-center mt-2 text-sm">
                <TrendIcon />
                <span className={`ml-1 font-semibold ${changeColor}`}>{change}</span>
                <span className="ml-2 text-gray-400">vs last period</span>
            </div>
        </div>
    );
};

export default KPICard;