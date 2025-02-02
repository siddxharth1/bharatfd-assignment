import { v2 } from '@google-cloud/translate';
const { Translate } = v2;
import { redis, CACHE_EXPIRY } from '../config/redis.config';
import { SUPPORTED_LANGUAGES } from '../config/language.config';
import { SupportedLanguage } from '../types/language.types';

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

const SUPPORTED_LANGS = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[];

export async function translateText(text: string, targetLang: SupportedLanguage): Promise<string> {
  const cacheKey = `trans:${text}:${targetLang}`;
  
  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  try {
    const [translation] = await translate.translate(text, targetLang);
    // Cache the result
    await redis.setex(cacheKey, CACHE_EXPIRY.ONE_DAY, translation);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
}

export async function translateToAllLanguages(text: string): Promise<Map<string, string>> {
  const translations = new Map<string, string>();
  
  await Promise.all(
    SUPPORTED_LANGS.map(async (lang) => {
      if (lang === 'en') {
        translations.set(lang, text);
        return;
      }
      const translation = await translateText(text, lang);
      translations.set(lang, translation);
    })
  );

  return translations;
} 