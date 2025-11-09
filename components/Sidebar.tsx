

import React from 'react';
import { Page } from '../types.ts';
import { TrendingUp, Target, Briefcase, HeartHandshake, Banknote, Database, Cable, BarChart2, Users } from 'lucide-react';
import { NEXUS_AI_LOGO } from '../assets/logo.ts';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { page: Page.STRATEGY, icon: <TrendingUp size={20} /> },
  { page: Page.MARKETING, icon: <Target size={20} /> },
  { page: Page.SALES, icon: <Briefcase size={20} /> },
  { page: Page.CUSTOMER_SUCCESS, icon: <HeartHandshake size={20} /> },
  { page: Page.FINANCE, icon: <Banknote size={20} /> },
  { type: 'divider' },
  { page: Page.DATA_SOURCES, icon: <Database size={20} /> },
  { page: Page.MAPPING_STUDIO, icon: <Cable size={20} /> },
  { page: Page.RECONCILIATION, icon: <BarChart2 size={20} /> },
  { page: Page.USER_MANAGEMENT, icon: <Users size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isCollapsed, onToggle }) => {
  return (
    <aside className={`bg-gray-800 flex flex-col border-r border-gray-700 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div 
        onClick={onToggle}
        className="h-16 flex items-center justify-center px-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
      >
        <img src={NEXUS_AI_LOGO} alt="Nexus AI Logo" className="h-10 w-auto" />
      </div>
      <nav className={`flex-1 py-6 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <ul>
          {navItems.map((item, index) => {
             if (item.type === 'divider') {
                return <hr key={index} className="my-4 border-gray-600" />;
             }
            return (
                <li key={item.page} title={isCollapsed ? item.page as string : undefined}>
                <button
                    onClick={() => setCurrentPage(item.page as Page)}
                    className={`w-full flex items-center py-3 rounded-lg transition-colors duration-200 ${
                    isCollapsed ? 'justify-center px-3' : 'px-4'
                    } ${
                    currentPage === item.page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                    {item.icon}
                    {!isCollapsed && <span className="ml-4 whitespace-nowrap">{item.page}</span>}
                </button>
                </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;