import React, { useState, useRef, useEffect } from 'react';
import { TranslationContent } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface ChatbotProps {
  translations: TranslationContent['chatbot'];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC<ChatbotProps> = ({ translations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    messageIdCounter.current += 1;
    const userMessage: Message = { id: messageIdCounter.current, text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      const botResponse = await getGeminiResponse(userText);
      if (isMounted.current) {
        messageIdCounter.current += 1;
        const botMessage: Message = { id: messageIdCounter.current, text: botResponse, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Failed to get bot response:", error);
      if (isMounted.current) {
        messageIdCounter.current += 1;
        const errorMessage: Message = { id: messageIdCounter.current, text: "Sorry, I couldn't get a response.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h3 className="font-bold text-lg">{translations.title}</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="p-2 rounded-lg bg-gray-200 text-gray-800">
                    <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={translations.placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <button onClick={handleSend} className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;