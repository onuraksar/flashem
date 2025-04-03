import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  back: {
    type: String,
    required: true,
  },
  front: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: false,
  },
  setId: {
    type: String,
    required: true
  },
  tagId: {
    type: String,
    required: false
  },
  userId: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;
