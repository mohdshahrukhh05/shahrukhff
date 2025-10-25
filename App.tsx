import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import ImageGeneration from './components/ImageGeneration';
import PhotoEditor from './components/PhotoEditor';
import ServiceRequest from './components/ServiceRequest';
import Chatbot from './components/Chatbot';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { TRANSLATIONS } from './constants';
import { Language, TranslationContent, ServiceRequestData } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<TranslationContent>(TRANSLATIONS.en);
  const [page, setPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestData[]>([]);

  useEffect(() => {
    setTranslations(TRANSLATIONS[language]);
  }, [language]);

  const handleNavigate = (sectionId: string) => {
    if (['login', 'admin', 'home'].includes(sectionId)) {
      setPage(sectionId);
    } else {
      setPage('home');
      // Use timeout to ensure the home page is rendered before scrolling
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('admin');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('home');
  };

  const addServiceRequest = (request: Omit<ServiceRequestData, 'id' | 'status'>) => {
    const newRequest: ServiceRequestData = {
      ...request,
      id: `REQ-${Date.now()}`,
      status: 'Pending',
    };
    setServiceRequests(prev => [...prev, newRequest]);
    return newRequest;
  };

  const updateRequestStatus = (id: string, status: ServiceRequestData['status']) => {
    setServiceRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };


  const renderPage = () => {
    if (page === 'login') {
      return <Login onLoginSuccess={handleLoginSuccess} translations={translations.login} />;
    }
    if (page === 'admin' && isLoggedIn) {
      return <AdminPanel 
                translations={translations.adminPanel} 
                requests={serviceRequests} 
                onLogout={handleLogout}
                onUpdateStatus={updateRequestStatus} 
             />;
    }
    // Default to home page
    return (
      <main>
        <Hero translations={translations.hero} onNavigate={handleNavigate} />
        <Services translations={translations.services} />
        <Team translations={translations.team} />
        <ImageGeneration translations={translations.imageGeneration} />
        <PhotoEditor translations={translations.photoEditor} />
        <ServiceRequest 
          translations={translations.serviceRequest} 
          services={translations.services.items}
          onAddRequest={addServiceRequest}
          allRequests={serviceRequests}
        />
        <Contact translations={translations.contact} />
      </main>
    );
  };

  return (
    <div className="font-sans">
      <Header 
        translations={translations.nav} 
        onNavigate={handleNavigate}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        isLoggedIn={isLoggedIn}
      />
      {renderPage()}
      {page === 'home' && <Chatbot translations={translations.chatbot} />}
    </div>
  );
}

export default App;
