import React, { useState, useMemo } from 'react';
import { User, Customer } from '../types.ts';
import { CUSTOMERS } from '../constants.ts';
import Card from '../components/Card.tsx';
import Customer360View from '../components/Customer360View.tsx';
import HealthScoreIndicator from '../components/HealthScoreIndicator.tsx';

interface CustomerSuccessDashboardProps {
  currentUser: User;
}

const CustomerSuccessDashboard: React.FC<CustomerSuccessDashboardProps> = ({ currentUser }) => {
  const visibleCustomers = useMemo(() => {
    if (currentUser.role === 'Administrator' || currentUser.role === 'CS Manager') {
        return CUSTOMERS;
    }
    return CUSTOMERS.filter(customer => customer.csOwnerId === currentUser.id);
  }, [currentUser]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(visibleCustomers[0] || null);


  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Success Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Customer Portfolio">
            <div className="overflow-y-auto h-[70vh]">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="p-3 font-semibold text-gray-600 text-sm">Name</th>
                            <th className="p-3 font-semibold text-gray-600 text-sm">Health</th>
                            <th className="p-3 font-semibold text-gray-600 text-sm">ARR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleCustomers.map((customer) => (
                            <tr 
                                key={customer.id} 
                                className={`cursor-pointer hover:bg-gray-100 ${selectedCustomer?.id === customer.id ? 'bg-blue-100' : ''}`}
                                onClick={() => setSelectedCustomer(customer)}
                            >
                                <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                                <td className="p-3"><HealthScoreIndicator score={customer.healthScore} /></td>
                                <td className="p-3 text-gray-600">${customer.arr.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Customer360View customer={selectedCustomer} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default CustomerSuccessDashboard;