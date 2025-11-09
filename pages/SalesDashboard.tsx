import React, { useState, useMemo } from 'react';
import { User, Customer } from '../types.ts';
import { CUSTOMERS } from '../constants.ts';
import Card from '../components/Card.tsx';
import Customer360View from '../components/Customer360View.tsx';
import HealthScoreIndicator from '../components/HealthScoreIndicator.tsx';
import { ChevronRight } from 'lucide-react';

interface SalesDashboardProps {
  currentUser: User;
}

const SalesDashboard: React.FC<SalesDashboardProps> = ({ currentUser }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const visibleCustomers = useMemo(() => {
    if (!currentUser) return [];
    if (['Administrator', 'Sales Manager'].includes(currentUser.role)) {
      return CUSTOMERS;
    }
    return CUSTOMERS.filter(c => c.salesOwnerId === currentUser.id);
  }, [currentUser]);

  const customersByRegion = useMemo(() => {
    return visibleCustomers.reduce((acc, customer) => {
      const region = customer.region || 'Uncategorized';
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(customer);
      return acc;
    }, {} as Record<string, Customer[]>);
  }, [visibleCustomers]);

  if (selectedCustomer) {
    return (
      <Customer360View
        customer={selectedCustomer}
        currentUser={currentUser}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Customer Portfolio</h2>
      <div className="space-y-8">
        {Object.entries(customersByRegion).map(([region, customers]) => (
          <div key={region}>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-blue-500">{region} ({customers.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map(customer => (
                <div 
                    key={customer.id} 
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedCustomer(customer)}
                >
                    <div>
                        <div className="flex items-center mb-3">
                            <img src={customer.logoUrl} alt={customer.name} className="w-10 h-10 rounded-md mr-4" />
                            <div>
                                <p className="font-bold text-gray-800">{customer.name}</p>
                                <p className="text-sm text-gray-500">{customer.industry}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-3">
                            <span className="font-semibold text-gray-600">ARR:</span>
                            <span className="text-gray-800 font-medium">${customer.arr.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between items-center text-sm mb-4">
                            <span className="font-semibold text-gray-600">Health:</span>
                             <HealthScoreIndicator score={customer.healthScore} />
                        </div>
                    </div>
                    <div className="text-sm text-blue-600 font-semibold flex items-center justify-end pt-2 border-t border-gray-100">
                        View 360° <ChevronRight size={16} className="ml-1" />
                    </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesDashboard;