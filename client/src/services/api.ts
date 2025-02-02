import axios from 'axios';
import { IFaq } from '../types/faq.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async getFaqs(lang: string = 'en'): Promise<IFaq[]> {
    const { data } = await axios.get(`${API_URL}/faqs?lang=${lang}`);
    return data;
  },

  async createFaq(question: string, answer: string): Promise<IFaq> {
    const { data } = await axios.post(`${API_URL}/faqs`, { question, answer });
    return data;
  },

  async updateFaq(id: string, question: string, answer: string): Promise<IFaq> {
    const { data } = await axios.put(`${API_URL}/faqs/${id}`, { question, answer });
    return data;
  },

  async getSupportedLanguages(): Promise<Record<string, string>> {
    const { data } = await axios.get(`${API_URL}/faqs/languages`);
    return data;
  }
}; 