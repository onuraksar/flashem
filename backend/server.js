import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import flashcardRoutes from './routes/flashcards.js';
import flashcardSetRoutes from './routes/flashcardSets.js';
import categoryRoutes from './routes/categories.js';
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/flashcardSets', flashcardSetRoutes);
app.use('/api/categories', categoryRoutes);
