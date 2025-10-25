import React from 'react';
import { TranslationContent } from '../types';
import Section from './Section';

interface TeamProps {
  translations: TranslationContent['team'];
}

const Team: React.FC<TeamProps> = ({ translations }) => {
  return (
    <Section id="team" className="bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{translations.title}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {translations.members.map((member) => (
          <div key={member.name} className="text-center">
            <img src={`https://picsum.photos/200/200?random=${member.name}`} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"/>
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;