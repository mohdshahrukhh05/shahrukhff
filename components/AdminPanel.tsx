import React from 'react';
import { TranslationContent, ServiceRequestData } from '../types';
import Section from './Section';

interface AdminPanelProps {
  translations: TranslationContent['adminPanel'];
  requests: ServiceRequestData[];
  onLogout: () => void;
  onUpdateStatus: (id: string, status: ServiceRequestData['status']) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ translations, requests, onLogout, onUpdateStatus }) => {
  return (
    <Section id="admin" className="min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{translations.title}</h2>
        <div>
          <span className="text-gray-600 mr-4">{translations.welcome}</span>
          <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700">
            {translations.logout}
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-700 mb-4">{translations.requestsTitle}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headers.id}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headers.name}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headers.service}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headers.status}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translations.headers.action}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length > 0 ? (
                requests.map(req => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            req.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            req.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {req.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select 
                        value={req.status} 
                        onChange={(e) => onUpdateStatus(req.id, e.target.value as ServiceRequestData['status'])}
                        className="border border-gray-300 rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">{translations.noRequests}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

export default AdminPanel;
