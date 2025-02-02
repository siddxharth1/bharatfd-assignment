import { SupportedLanguages, SupportedLanguage } from '../types/language.types';

export const SUPPORTED_LANGUAGES: SupportedLanguages = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  es: 'Spanish',
  fr: 'French'
} as const;

export const isValidLanguage = (lang: string): lang is SupportedLanguage => {
  return lang in SUPPORTED_LANGUAGES;
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'; 