import React from 'react';
import { USERS } from '../constants.ts';
import Card from '../components/Card.tsx';
import { Edit, Trash2 } from 'lucide-react';

const getRoleClass = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-red-100 text-red-800';
      case 'Sales Manager':
        return 'bg-blue-100 text-blue-800';
      case 'CS Manager':
        return 'bg-green-100 text-green-800';
      case 'Sales Rep':
        return 'bg-indigo-100 text-indigo-800';
      case 'CSM':
        return 'bg-teal-100 text-teal-800';
      case 'Marketing':
        return 'bg-pink-100 text-pink-800';
      case 'Finance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
};

const UserManagement: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          Add New User
        </button>
      </div>
      <Card title="All Users">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Role</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 last:border-b-0">
                  <td className="p-4 flex items-center">
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="ml-4 font-medium text-gray-800">{user.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRoleClass(user.role)}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-blue-600" title="Edit User">
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-red-600" title="Delete User">
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default UserManagement;