import React from 'react';
import { Customer, User } from '../types.ts';
import Card from './Card.tsx';
import HealthScoreIndicator from './HealthScoreIndicator.tsx';
import { USERS } from '../constants.ts';
import { ArrowLeft, DollarSign, Calendar, Building, Clock, Ticket, MessageSquare, Phone, Users as UsersIcon, Briefcase, Globe, Box, CheckSquare } from 'lucide-react';

interface Customer360ViewProps {
    customer: Customer | null;
    currentUser: User;
    onBack?: () => void;
}

const DetailItem: React.FC<{ icon: React.ReactNode, label: string, value: string | React.ReactNode }> = ({ icon, label, value }) => (
    <div className="flex items-start text-sm py-2">
        <div className="text-gray-500 mr-3 mt-1">{icon}</div>
        <div>
            <p className="font-semibold text-gray-600">{label}</p>
            <p className="text-gray-800">{value}</p>
        </div>
    </div>
);


const Customer360View: React.FC<Customer360ViewProps> = ({ customer, onBack }) => {
    if (!customer) {
        return (
            <Card title="Customer 360° View">
                <div className="flex items-center justify-center h-[70vh] text-gray-500">
                    <p>Select a customer from the list to see their details.</p>
                </div>
            </Card>
        );
    }

    const csOwner = USERS.find(u => u.id === customer.csOwnerId);
    const salesOwner = USERS.find(u => u.id === customer.salesOwnerId);

    const activityIcon = (type: string) => {
        switch(type) {
            case 'Email': return <MessageSquare size={16} className="text-blue-500" />;
            case 'Call': return <Phone size={16} className="text-green-500" />;
            case 'Meeting': return <UsersIcon size={16} className="text-purple-500" />;
            case 'QBR': return <Calendar size={16} className="text-orange-500" />;
            default: return <MessageSquare size={16} />;
        }
    }
    
    const ticketStatusColor = (status: string) => {
        switch(status) {
            case 'Open': return 'bg-red-100 text-red-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Closed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <Card title="">
            <div className="overflow-y-auto h-[70vh] pr-2">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                    <div className="flex items-center">
                        <img src={customer.logoUrl} alt={`${customer.name} logo`} className="w-16 h-16 rounded-md mr-4" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
                            <p className="text-gray-500">{customer.industry}</p>
                            {customer.parentCompany && <p className="text-sm text-gray-500">Part of {customer.parentCompany}</p>}
                        </div>
                    </div>
                     {onBack && (
                        <button onClick={onBack} className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Portfolio
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Column 1: Key Info & Ownership */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-2 flex items-center"><CheckSquare size={18} className="mr-2 text-blue-500"/>Key Information</h3>
                        <DetailItem icon={<Clock size={18} />} label="Customer Since" value={customer.since} />
                        <DetailItem icon={<Calendar size={18} />} label="Renewal Date" value={customer.renewalDate} />
                        <DetailItem icon={<Globe size={18} />} label="Region" value={customer.region} />
                        <DetailItem icon={<UsersIcon size={18} />} label="CS Owner" value={csOwner?.name || 'Unassigned'} />
                        <DetailItem icon={<Briefcase size={18} />} label="Sales Owner" value={salesOwner?.name || 'Unassigned'} />
                    </div>
                    {/* Column 2: Financials */}
                     <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-2 flex items-center"><DollarSign size={18} className="mr-2 text-green-500"/>Financials</h3>
                        <DetailItem icon={<DollarSign size={18} />} label="Annual Recurring Revenue (ARR)" value={`$${customer.arr.toLocaleString()}`} />
                        <DetailItem icon={<Building size={18} />} label="Total Contract Value (TCV)" value={`$${customer.tcv.toLocaleString()}`} />
                        <div className="pt-2">
                            <h4 className="font-semibold text-gray-600 text-sm mb-2">Purchased Products</h4>
                            <div className="flex flex-wrap gap-2">
                                {customer.products.map(p => <span key={p} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"><Box size={12} className="mr-1"/>{p}</span>)}
                            </div>
                        </div>
                    </div>
                    {/* Column 3: Health Score */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-2">Health Score</h3>
                         <div className="flex justify-center py-4">
                            <HealthScoreIndicator score={customer.healthScore} />
                         </div>
                         <p className="text-xs text-gray-500 text-center">Based on product usage, support history, and survey feedback.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Recent Activity</h3>
                        <div className="space-y-3">
                            {customer.recentActivity.length > 0 ? customer.recentActivity.map(activity => (
                                <div key={activity.id} className="flex items-start bg-gray-50 p-3 rounded-md">
                                    <div className="mr-3 mt-1">{activityIcon(activity.type)}</div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{activity.type}: <span className="font-normal">{activity.summary}</span></p>
                                        <p className="text-xs text-gray-500">{activity.date}</p>
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-500">No recent activity.</p>}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Support Tickets</h3>
                         <div className="space-y-3">
                            {customer.supportTickets.length > 0 ? customer.supportTickets.map(ticket => (
                                <div key={ticket.id} className="bg-gray-50 p-3 rounded-md">
                                    <div className="flex justify-between items-center">
                                       <p className="font-semibold text-gray-800 text-sm flex items-center"><Ticket size={16} className="mr-2 text-gray-500"/>{ticket.subject}</p>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ticketStatusColor(ticket.status)}`}>{ticket.status}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Last update: {ticket.lastUpdate}</p>
                                </div>
                            )) : <p className="text-sm text-gray-500">No support tickets.</p>}
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    );
};

export default Customer360View;