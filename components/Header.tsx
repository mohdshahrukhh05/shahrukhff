import React from 'react';
import { TranslationContent, Language } from '../types';

interface HeaderProps {
  translations: TranslationContent['nav'];
  onNavigate: (sectionId: string) => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ translations, onNavigate, currentLanguage, onLanguageChange, isLoggedIn }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => onNavigate('home')}>
            Mohammad Faizan JSK
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-gray-600 hover:text-blue-600">{translations.home}</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="text-gray-600 hover:text-blue-600">{translations.services}</a>
            <a href="#team" onClick={(e) => { e.preventDefault(); onNavigate('team'); }} className="text-gray-600 hover:text-blue-600">{translations.team}</a>
            <a href="#image-generation" onClick={(e) => { e.preventDefault(); onNavigate('image-generation'); }} className="text-gray-600 hover:text-blue-600">{translations.imageGeneration}</a>
            <a href="#photo-editor" onClick={(e) => { e.preventDefault(); onNavigate('photo-editor'); }} className="text-gray-600 hover:text-blue-600">{translations.photoEditor}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-gray-600 hover:text-blue-600">{translations.contact}</a>
            <a href="#admin" onClick={(e) => { e.preventDefault(); onNavigate(isLoggedIn ? 'admin' : 'login'); }} className="text-gray-600 hover:text-blue-600">{translations.admin}</a>
          </nav>
          <div className="flex items-center space-x-4">
             <button onClick={() => onNavigate('request-service')} className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
              {translations.requestService}
            </button>
            <div className="relative">
              <select 
                value={currentLanguage} 
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-gray-100 border border-gray-300 rounded-md py-1 px-2 focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
