import { SupportedLanguage } from './language.types';

export interface ITranslation {
  question: string;
  answer: string;
}

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  translations: Map<string, ITranslation>;
  language?: SupportedLanguage;
  createdAt: string;
  updatedAt: string;
} 