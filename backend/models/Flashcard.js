// backend/models/Flashcard.js

const mongoose = require('mongoose');

// Define the Flashcard schema
const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,  // Or you can use `mongoose.Schema.Types.ObjectId` if you reference the user model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Flashcard model
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;
