import express from 'express';
const router = express.Router();
import Tag from '../models/Tag';
import verifyFirebaseToken from '../middleware/authmiddleWare';

// router.get('/', verifyFirebaseToken, async (req, res) => {
//   try {
//     const flashcards = await Flashcard.find({ userId: req.user.uid }); // Filter flashcards by userId
//     if (!flashcards || flashcards.length === 0) {
//       return res.status(404).json({ message: 'No flashcards found' });
//     }
//     res.json(flashcards);  // Send the flashcards as a JSON response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Add Tag
// router.post('/add', verifyFirebaseToken, async (req, res) => {
//   const { question, answer, category } = req.body;

//   if (!question || !answer || !category) {
//     return res.status(400).json({ message: 'All fields (question, answer, category) are required.' });
//   }

//   console.log('req.user:', req.user);

//   // Create a new flashcard with the userId from req.user.uid
//   const newFlashcard = new Flashcard({
//     question,
//     answer,
//     category,
//     userId: req.user.uid,  // Save the user's UID to associate with the flashcard
//   });

//   try {
//     const savedFlashcard = await newFlashcard.save();
//     res.json(savedFlashcard);  // Return the saved flashcard
//   } catch (error) {
//     console.error('Error saving flashcard:', error);
//     res.status(500).json({ message: 'Error saving flashcard' });
//   }
// });

export default router;
