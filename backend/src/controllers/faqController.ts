import { Request, Response } from 'express';
import Faq from '../models/Faq';
import { translateToAllLanguages } from '../services/translationService';
import { redis, CACHE_EXPIRY, clearCache } from '../config/redis.config';
import { isValidLanguage, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../config/language.config';

export async function createFaq(req: Request, res: Response): Promise<void> {
  try {
    const { question, answer } = req.body;
    
    // Create translations for both question and answer
    const [questionTranslations, answerTranslations] = await Promise.all([
      translateToAllLanguages(question),
      translateToAllLanguages(answer)
    ]);

    // Combine translations
    const translations = new Map();
    questionTranslations.forEach((q, lang) => {
      translations.set(lang, {
        question: q,
        answer: answerTranslations.get(lang) || answer
      });
    });

    const faq = new Faq({
      question,
      answer,
      translations
    });

    await faq.save();
    await clearCache('faqs:*');
    
    res.status(201).json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Error creating FAQ' });
  }
}

export function getSupportedLanguages(_req: Request, res: Response): void {
  res.json(SUPPORTED_LANGUAGES);
}

export async function getAllFaqs(req: Request, res: Response): Promise<void> {
  try {
    const requestedLang = (req.query.lang as string) || DEFAULT_LANGUAGE;
    
    if (!isValidLanguage(requestedLang)) {
      res.status(400).json({ 
        error: 'Invalid language',
        supportedLanguages: SUPPORTED_LANGUAGES
      });
      return;
    }

    // Try to get from cache first
    const cacheKey = `faqs:${requestedLang}`;
    const cachedFaqs = await redis.get(cacheKey);
    
    if (cachedFaqs) {
      res.json(JSON.parse(cachedFaqs));
      return;
    }

    const faqs = await Faq.find();
    
    if (requestedLang === DEFAULT_LANGUAGE) {
      // Cache and return default language results
      await redis.setex(cacheKey, CACHE_EXPIRY.ONE_HOUR, JSON.stringify(faqs));
      res.json(faqs);
      return;
    }

    // Transform FAQs with translations
    const translatedFaqs = faqs.map(faq => {
      const translation = faq.translations.get(requestedLang);
      if (translation) {
        return {
          ...faq.toObject(),
          question: translation.question,
          answer: translation.answer,
          language: requestedLang
        };
      }
      return {
        ...faq.toObject(),
        language: DEFAULT_LANGUAGE
      };
    });

    // Cache translated results
    await redis.setex(cacheKey, CACHE_EXPIRY.ONE_HOUR, JSON.stringify(translatedFaqs));
    res.json(translatedFaqs);

  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Error fetching FAQs' });
  }
}

export async function updateFaq(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await Faq.findById(id);
    if (!faq) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }

    // Only translate if content has changed
    if (question !== faq.question) {
      const questionTranslations = await translateToAllLanguages(question);
      questionTranslations.forEach((q, lang) => {
        const existing = faq.translations.get(lang) || { question: '', answer: '' };
        faq.translations.set(lang, { ...existing, question: q });
      });
    }

    if (answer !== faq.answer) {
      const answerTranslations = await translateToAllLanguages(answer);
      answerTranslations.forEach((a, lang) => {
        const existing = faq.translations.get(lang) || { question: '', answer: '' };
        faq.translations.set(lang, { ...existing, answer: a });
      });
    }

    faq.question = question;
    faq.answer = answer;
    await faq.save();

    // Clear all language caches
    await clearCache('faqs:*');

    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Error updating FAQ' });
  }
} 