require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const flashcardRoutes = require('./routes/flashcards');
app.use('/api/flashcards', flashcardRoutes);
