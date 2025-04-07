import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const flashcardSetSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    categoryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
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

const FlashcardSet = mongoose.model('FlashcardSet', flashcardSetSchema);

export default FlashcardSet;
