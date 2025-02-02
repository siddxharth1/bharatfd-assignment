import { Request, Response, NextFunction } from 'express';

export const validateFaqInput = (req: Request, res: Response, next: NextFunction): void => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    res.status(400).json({ error: 'Question and answer are required' });
    return;
  }

  if (typeof question !== 'string' || typeof answer !== 'string') {
    res.status(400).json({ error: 'Question and answer must be strings' });
    return;
  }

  if (question.length < 10 || answer.length < 10) {
    res.status(400).json({ error: 'Question and answer must be at least 10 characters long' });
    return;
  }

  next();
}; 