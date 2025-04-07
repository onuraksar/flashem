import express from 'express';
const router = express.Router();
import FlashcardSet from '../models/FlashcardSet.js';
import verifyFirebaseToken from '../middleware/authmiddleWare.js';

// router.get('/get', verifyFirebaseToken, async (req, res) => {
//   try {
//     const flashcardSets = await FlashcardSet.find({ userId: req.user.uid }); // Filter flashcard sets by userId
//     if (!flashcardSets || flashcardSets.length === 0) {
//       return res.status(404).json({ message: 'No flashcard sets found' });
//     }
//     res.json(flashcardSets);  // Send the flashcards as a JSON response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


router.get('/get', verifyFirebaseToken, async (req, res) => {
  try {
    const { categoryId, sortBy = 'createdAt', order = 'desc' } = req.query;

    const filters = {
      userId: req.user.uid, // always secure by user
    };

    if (categoryId) {
      filters.categoryId = categoryId;
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const flashcardSets = await FlashcardSet.find(filters).sort({
      [sortBy]: sortOrder,
    });

    res.json(flashcardSets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add Flashcard Set
router.post('/add', verifyFirebaseToken, async (req, res) => {
  const { categoryId, name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'name is required.' });
  }

  const newFlashcardSet = new FlashcardSet({
    name,
    categoryId,
    userId: req.user.uid
  });

  try {
    const savedFlashcardSet = await newFlashcardSet.save();
    res.json(savedFlashcardSet); 
  } catch (error) {
    console.error('Error saving flashcard set:', error);
    res.status(500).json({ message: 'Error saving flashcard set' });
  }
});


// router.post('/add', async (req, res) => {
//     const newFlashcard = new Flashcard({
//       question: 'What is the capital of France?',
//       answer: 'Lonodn',
//       category: 'Geography',
//     });

//     console.log('acuatl req:', req)
  
//     try {
//       const savedFlashcard = await newFlashcard.save();
//       res.json(savedFlashcard); // Return the saved flashcard
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error adding flashcard' });
//     }
// });

// router.get('/', verifyFirebaseToken, (req, res) => {
//     res.json({ message: `Hello, ${req.user.email}! You are authenticated.` });
// });

export default router;
