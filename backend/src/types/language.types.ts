export type SupportedLanguages = {
  en: 'English';
  hi: 'Hindi';
  bn: 'Bengali';
  es: 'Spanish';
  fr: 'French';
};

export type SupportedLanguage = keyof SupportedLanguages;

export interface TranslationResponse {
  text: string;
  language: SupportedLanguage;
} 