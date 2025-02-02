import { useEffect, useState, useCallback } from 'react';
import { IFaq } from '../types/faq.types';
import { api } from '../services/api';
import FaqItem from './FaqItem';
import LanguageSelector from './LanguageSelector';

const FaqList = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const loadFaqs = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getFaqs(currentLang);
      setFaqs(data);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentLang]);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h2>
        <LanguageSelector currentLang={currentLang} onLanguageChange={setCurrentLang} />
      </div>
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No FAQs available</p>
          </div>
        ) : (
          faqs.map((faq) => <FaqItem key={faq._id} faq={faq} />)
        )}
      </div>
    </div>
  );
};

export default FaqList; 