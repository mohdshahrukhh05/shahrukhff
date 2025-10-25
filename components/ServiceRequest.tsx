import React, { useState } from 'react';
import { TranslationContent, ServiceRequestData } from '../types';
import Section from './Section';

interface ServiceRequestProps {
  translations: TranslationContent['serviceRequest'];
  services: TranslationContent['services']['items'];
  onAddRequest: (request: Omit<ServiceRequestData, 'id' | 'status'>) => ServiceRequestData;
  allRequests: ServiceRequestData[];
}

const ServiceRequest: React.FC<ServiceRequestProps> = ({ translations, services, onAddRequest, allRequests }) => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', details: '' });
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const [requestIdToCheck, setRequestIdToCheck] = useState('');
  const [checkedStatus, setCheckedStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service) return;
    
    setStatus('submitting');
    const newRequest = onAddRequest(formData);
    setLastSubmittedId(newRequest.id);
    setStatus('success');
    setFormData({ name: '', email: '', service: '', details: '' });
  };

  const handleStatusCheck = () => {
    const request = allRequests.find(r => r.id === requestIdToCheck);
    setCheckedStatus(request ? request.status : 'Request not found.');
  };

  return (
    <Section id="request-service" className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{translations.title}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            {status === 'success' && lastSubmittedId ? (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-600 mb-4">{translations.thankYouTitle}</h3>
                    <p className="text-gray-700 mb-4">{translations.thankYouMessage}</p>
                    <p className="text-gray-700 font-semibold">{translations.yourRequestId}</p>
                    <p className="text-lg font-bold text-blue-600 bg-blue-50 p-2 rounded">{lastSubmittedId}</p>
                    <button onClick={() => setStatus('idle')} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700">
                        Submit another request
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{translations.nameLabel}</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder={translations.namePlaceholder} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{translations.emailLabel}</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder={translations.emailPlaceholder} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">{translations.serviceLabel}</label>
                    <select name="service" id="service" value={formData.service} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="" disabled>{translations.servicePlaceholder}</option>
                    {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">{translations.detailsLabel}</label>
                    <textarea name="details" id="details" rows={3} value={formData.details} onChange={handleChange} placeholder={translations.detailsPlaceholder} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div>
                    <button type="submit" disabled={status === 'submitting'} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
                    {status === 'submitting' ? 'Submitting...' : translations.submitButton}
                    </button>
                </div>
                </form>
            )}
          </div>

          {/* Status Check Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{translations.statusCheck}</h3>
            <div className="space-y-4">
               <div>
                 <label htmlFor="request-id" className="block text-sm font-medium text-gray-700">Request Number</label>
                 <input 
                    type="text" 
                    id="request-id"
                    value={requestIdToCheck}
                    onChange={(e) => setRequestIdToCheck(e.target.value)}
                    placeholder={translations.requestIdPlaceholder} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
               </div>
               <button onClick={handleStatusCheck} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">
                 {translations.checkButton}
               </button>
               {checkedStatus && (
                 <div className="mt-4 p-3 bg-gray-100 rounded">
                    <p className="text-gray-800">Status: <span className="font-bold">{checkedStatus}</span></p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ServiceRequest;
