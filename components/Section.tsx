import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  // FIX: Add style prop to allow for inline styling, resolving the error in Hero.tsx.
  style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '', style }) => {
  return (
    <section id={id} className={`py-12 md:py-20 ${className}`} style={style}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;