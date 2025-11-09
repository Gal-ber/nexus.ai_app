import React, { useState, useRef, useMemo } from 'react';
import { DATA_SOURCES as INITIAL_DATA_SOURCES } from '../constants.ts';
import { DataSource, DataSourceStatus } from '../types.ts';
import { CheckCircle2, AlertTriangle, Hourglass, UploadCloud, Sheet } from 'lucide-react';

const DataSources: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>(INITIAL_DATA_SOURCES);
  const [statusFilter, setStatusFilter] = useState<DataSourceStatus | 'All'>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConnectGoogleSheet = () => {
    const newSource: DataSource = {
        id: `gsheet-${Date.now()}`,
        name: 'My Google Sheet',
        logoUrl: 'https://picsum.photos/seed/gs/40/40',
        status: DataSourceStatus.SYNCING,
        lastSynced: 'Just now'
    };
    setDataSources(prev => [...prev, newSource]);

    setTimeout(() => {
        setDataSources(prev => prev.map(s => s.id === newSource.id ? { ...s, status: DataSourceStatus.CONNECTED, lastSynced: 'A few seconds ago' } : s));
    }, 3000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSource: DataSource = {
        id: `file-${Date.now()}`,
        name: file.name,
        logoUrl: 'https://picsum.photos/seed/file/40/40',
        status: DataSourceStatus.SYNCING,
        lastSynced: 'Just now'
      };
      setDataSources(prev => [...prev, newSource]);

      setTimeout(() => {
        setDataSources(prev => prev.map(s => s.id === newSource.id ? { ...s, status: DataSourceStatus.CONNECTED, lastSynced: 'A few seconds ago' } : s));
    }, 3000);

      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const filteredDataSources = useMemo(() => {
    if (statusFilter === 'All') {
        return dataSources;
    }
    return dataSources.filter(source => source.status === statusFilter);
  }, [dataSources, statusFilter]);


  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv,.xlsx,.json"
      />
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Data Sources</h2>
        <div className="flex items-center space-x-2">
            <div>
              <label htmlFor="status-filter" className="sr-only">Filter by status</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as DataSourceStatus | 'All')}
                className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value={DataSourceStatus.CONNECTED}>Connected</option>
                <option value={DataSourceStatus.SYNCING}>Syncing</option>
                <option value={DataSourceStatus.ERROR}>Error</option>
              </select>
            </div>
            <button 
                onClick={handleConnectGoogleSheet}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300">
                <Sheet size={20} className="mr-2" />
                Connect Google Sheet
            </button>
            <button 
                onClick={handleUploadClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300">
                <UploadCloud size={20} className="mr-2" />
                Upload File
            </button>
        </div>
      </div>
     
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Source</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Last Synced</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataSources.map((source) => (
              <tr key={source.id} className="border-b border-gray-200 last:border-b-0">
                <td className="p-4 flex items-center">
                  <img src={source.logoUrl} alt={source.name} className="w-8 h-8 rounded-full" />
                  <span className="ml-4 font-medium text-gray-800">{source.name}</span>
                </td>
                <td className="p-4">
                   <div className="flex items-center">
                    {source.status === 'Connected' && <CheckCircle2 className="text-green-500 mr-2" />}
                    {source.status === 'Syncing' && <Hourglass className="text-yellow-500 mr-2 animate-spin" />}
                    {source.status === 'Error' && <AlertTriangle className="text-red-500 mr-2" />}
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        source.status === 'Connected' ? 'bg-green-100 text-green-800' :
                        source.status === 'Syncing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {source.status}
                    </span>
                   </div>
                </td>
                <td className="p-4 text-gray-600 hidden md:table-cell">{source.lastSynced}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline font-medium">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSources;