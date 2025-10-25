import React, { useState } from 'react';
import { TranslationContent } from '../types';
import { generateImage } from '../services/geminiService';
import Section from './Section';

interface ImageGenerationProps {
  translations: TranslationContent['imageGeneration'];
}

const ImageGeneration: React.FC<ImageGenerationProps> = ({ translations }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const result = await generateImage(prompt);
      if (result) {
        setImageUrl(result);
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } catch (e) {
      setError('An error occurred. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="image-generation" className="bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{translations.title}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700 mb-1">
              {translations.promptLabel}
            </label>
            <input
              type="text"
              id="image-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={translations.promptPlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? translations.generatingText : translations.buttonText}
          </button>
        </div>

        <div className="mt-8 min-h-[300px] flex items-center justify-center bg-gray-100 rounded-lg p-4">
          {isLoading && (
            <div className="flex flex-col items-center">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-gray-600">{translations.generatingText}</p>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={prompt} 
              className="max-w-full max-h-[512px] rounded-md shadow-lg"
            />
          )}
          {!isLoading && !error && !imageUrl && (
            <p className="text-gray-500">Your generated image will appear here.</p>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ImageGeneration;
