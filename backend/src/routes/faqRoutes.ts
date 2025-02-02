import express from 'express';
import { createFaq, getAllFaqs, getSupportedLanguages, updateFaq } from '../controllers/faqController';
import { validateFaqInput } from '../middleware/validateFaq';

const router = express.Router();

// Get supported languages
router.get('/languages', getSupportedLanguages);

// Get all FAQs with language support
router.get('/', getAllFaqs);

// Create FAQ
router.post('/', validateFaqInput, createFaq);

// Update FAQ
router.put('/:id', validateFaqInput, updateFaq);

export default router; 