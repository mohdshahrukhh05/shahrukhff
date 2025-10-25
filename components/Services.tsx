import React from 'react';
import { TranslationContent } from '../types';
import Section from './Section';

interface ServicesProps {
  translations: TranslationContent['services'];
}

const Services: React.FC<ServicesProps> = ({ translations }) => {
  return (
    <Section id="services" className="bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{translations.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {translations.items.map((service) => (
          <div key={service.title} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-800">{service.title}</h3>
            <p className="mt-2 text-gray-600">{service.description}</p>
            {service.price && <p className="mt-4 font-bold text-blue-700">{service.price}</p>}
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-gray-700 max-w-3xl mx-auto">{translations.outro}</p>
    </Section>
  );
};

export default Services;
