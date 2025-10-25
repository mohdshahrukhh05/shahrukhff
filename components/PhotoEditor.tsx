import React, { useState, useRef } from 'react';
import { TranslationContent } from '../types';
import { editImage } from '../services/geminiService';
import Section from './Section';

interface PhotoEditorProps {
  translations: TranslationContent['photoEditor'];
}

type EditorTab = 'background' | 'enhance' | 'passport';

const PhotoEditor: React.FC<PhotoEditorProps> = ({ translations }) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('background');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setEditedImage(null); // Reset edited image on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (prompt: string) => {
    if (!originalFile || !originalImage) return;

    setIsLoading(true);
    setEditedImage(null);
    try {
      // The base64 string from FileReader includes the data URL prefix, which needs to be removed.
      const base64Data = originalImage.split(',')[1];
      const result = await editImage(base64Data, originalFile.type, prompt);
      if (result) {
        setEditedImage(result);
      }
    } catch (error) {
      console.error("Image editing failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const TabButton: React.FC<{ tabId: EditorTab; label: string }> = ({ tabId, label }) => (
    <button
        onClick={() => setActiveTab(tabId)}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === tabId
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
    >
        {label}
    </button>
  );

  return (
    <Section id="photo-editor" className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{translations.title}</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Image Upload */}
            {!originalImage && (
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <p className="text-gray-500">{translations.uploadLabel}</p>
                </div>
            )}

            {originalImage && (
                <>
                    {/* Tabs */}
                    <div className="flex justify-center space-x-2 mb-6 border-b pb-4">
                        <TabButton tabId="background" label={translations.backgroundRemover} />
                        <TabButton tabId="enhance" label={translations.enhancer} />
                        <TabButton tabId="passport" label={translations.passportPhoto} />
                    </div>

                    {/* Image Previews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="text-center">
                            <h3 className="font-semibold mb-2">{translations.original}</h3>
                            <img src={originalImage} alt="Original" className="w-full h-auto rounded-md shadow-md" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold mb-2">{translations.edited}</h3>
                            <div className="w-full h-full bg-gray-100 rounded-md shadow-md flex items-center justify-center">
                                {isLoading ? <p>{translations.processing}</p> : 
                                 editedImage ? <img src={editedImage} alt="Edited" className="w-full h-auto rounded-md" /> : <p className="text-gray-400">Result will appear here</p>}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center space-y-4">
                        {activeTab === 'background' && <button onClick={() => handleEdit('Remove the background, make it transparent.')} disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">{isLoading ? translations.processing : translations.removeBg}</button>}
                        {activeTab === 'enhance' && <button onClick={() => handleEdit('Enhance the quality of this image, make it sharper and clearer.')} disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">{isLoading ? translations.processing : translations.enhanceImage}</button>}
                        {activeTab === 'passport' && <button onClick={() => handleEdit('Format this as a passport size photo with a plain white background. Crop to head and shoulders.')} disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">{isLoading ? translations.processing : translations.formatPassport}</button>}

                        {editedImage && (
                            <a href={editedImage} download="edited-image.png" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                                {translations.download}
                            </a>
                        )}
                    </div>
                </>
            )}
        </div>
      </div>
    </Section>
  );
};

export default PhotoEditor;
