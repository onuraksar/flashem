import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { NULL_UUID } from '../utils/constants.js';

const flashcardSetSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    categoryId: {
        type: String,
        default: NULL_UUID
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
