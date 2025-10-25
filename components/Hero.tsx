import React from 'react';
import { TranslationContent } from '../types';
import Section from './Section';

interface HeroProps {
  translations: TranslationContent['hero'];
  onNavigate: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ translations, onNavigate }) => {
  return (
    <Section id="home" className="bg-cover bg-center text-white" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div className="bg-black bg-opacity-60 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">{translations.title}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{translations.subtitle}</p>
        <button onClick={() => onNavigate('request-service')} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
          {translations.cta}
        </button>
      </div>
    </Section>
  );
};

export default Hero;
