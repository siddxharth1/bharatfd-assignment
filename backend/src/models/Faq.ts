import mongoose, { Schema } from 'mongoose';
import { IFaq } from '../types/faq.types';

const faqSchema = new Schema<IFaq>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: {
        question: { type: String },
        answer: { type: String }
      },
      default: new Map()
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFaq>('Faq', faqSchema); 