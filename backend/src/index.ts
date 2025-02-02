import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import faqRoutes from './routes/faqRoutes';
import { connectDB } from './config/mongodb.config';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    // Routes
    app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Hello World!' });
    });

    app.use('/api/faqs', faqRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Server initialization failed:', error);
    process.exit(1);
  }); 