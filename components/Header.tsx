import React from 'react';
import { User } from '../types.ts';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-700">Nexus AI Platform</h1>
      </div>
      <div className="flex items-center">
        {currentUser && (
          <span className="text-sm font-medium mr-4 text-gray-700">Welcome, {currentUser.name}</span>
        )}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;