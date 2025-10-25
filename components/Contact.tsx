import React from 'react';
import { TranslationContent } from '../types';
import Section from './Section';

interface ContactProps {
  translations: TranslationContent['contact'];
}

const ContactIcon: React.FC<{ d: string }> = ({ d }) => (
  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
  </svg>
);

const Contact: React.FC<ContactProps> = ({ translations }) => {
  return (
    <Section id="contact" className="bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{translations.title}</h2>
        <div className="max-w-lg mx-auto">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                    <ContactIcon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <div>
                        <h3 className="font-semibold text-gray-700">Address</h3>
                        <p className="text-gray-600">{translations.address}</p>
                    </div>
                </div>
                <div className="flex items-center">
                     <ContactIcon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    <div>
                        <h3 className="font-semibold text-gray-700">Email</h3>
                        <p className="text-gray-600">{translations.email}</p>
                    </div>
                </div>
                <div className="flex items-center">
                     <ContactIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    <div>
                        <h3 className="font-semibold text-gray-700">Phone</h3>
                        <p className="text-gray-600">{translations.phone}</p>
                    </div>
                </div>
                 <div className="flex items-center">
                     <ContactIcon d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    <div>
                        <h3 className="font-semibold text-gray-700">WhatsApp</h3>
                        <p className="text-gray-600">{translations.whatsapp}</p>
                    </div>
                </div>
                 <div className="flex items-center">
                     <ContactIcon d="M13.828 2.172a4.03 4.03 0 00-5.656 0l-4 4a4.03 4.03 0 000 5.656l1.586 1.586a.992.992 0 001.402-.01l1.4-1.4a.992.992 0 00.01-1.402l-1.586-1.586a2.015 2.015 0 010-2.828l4-4a2.015 2.015 0 012.828 0l1.586 1.586a.992.992 0 001.402.01l1.4 1.4a.992.992 0 00-.01 1.402l-1.586-1.586a4.03 4.03 0 000 5.656l4-4a4.03 4.03 0 000-5.656l-1.586-1.586a.992.992 0 00-1.402.01l-1.4 1.4a.992.992 0 00-.01-1.402l1.586-1.586z" />
                    <div>
                        <h3 className="font-semibold text-gray-700">{translations.socials}</h3>
                        <a href="https://www.instagram.com/faizancsc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{translations.instagram}</a>
                    </div>
                </div>
            </div>
        </div>
    </Section>
  );
};

export default Contact;