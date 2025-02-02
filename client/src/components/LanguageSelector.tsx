import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Props {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageSelector = ({ currentLang, onLanguageChange }: Props) => {
  const [languages, setLanguages] = useState<Record<string, string>>({});

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      const data = await api.getSupportedLanguages();
      setLanguages(data);
    } catch (error) {
      console.error('Error loading languages:', error);
    }
  };

  return (
    <select
      value={currentLang}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-700"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector; 