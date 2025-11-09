import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import { Page, User } from './types.ts';
import Login from './pages/Login.tsx';
import StrategyDashboard from './pages/Dashboard.tsx';
import MarketingDashboard from './pages/MarketingDashboard.tsx';
import SalesDashboard from './pages/SalesDashboard.tsx';
import CustomerSuccessDashboard from './pages/CustomerSuccessDashboard.tsx';
import FinanceDashboard from './pages/FinanceDashboard.tsx';
import DataSources from './pages/DataSources.tsx';
import MappingStudio from './pages/MappingStudio.tsx';
import Reconciliation from './pages/Reconciliation.tsx';
import UserManagement from './pages/UserManagement.tsx';
import { USERS } from './constants.ts';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.STRATEGY);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be a secure API call.
    // Here, we check against the constant user list.
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user && password === '12345') {
      setCurrentUser(user);
      return true;
    }
    
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.STRATEGY:
        return <StrategyDashboard />;
      case Page.MARKETING:
        return <MarketingDashboard />;
      case Page.SALES:
        return <SalesDashboard currentUser={currentUser!} />;
      case Page.CUSTOMER_SUCCESS:
        return <CustomerSuccessDashboard currentUser={currentUser!} />;
      case Page.FINANCE:
        return <FinanceDashboard />;
      case Page.DATA_SOURCES:
        return <DataSources />;
      case Page.MAPPING_STUDIO:
        return <MappingStudio />;
      case Page.RECONCILIATION:
        return <Reconciliation />;
      case Page.USER_MANAGEMENT:
        return <UserManagement />;
      default:
        return <StrategyDashboard />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;