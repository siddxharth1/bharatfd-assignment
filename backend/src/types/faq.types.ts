export interface ITranslation {
  question: string;
  answer: string;
}

export interface IFaq extends Document {
  question: string;
  answer: string;
  translations: Map<string, ITranslation>;
  createdAt: Date;
  updatedAt: Date;
} 