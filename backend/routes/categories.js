import express from 'express';
const router = express.Router();
import Category from '../models/Category.js';
import verifyFirebaseToken from '../middleware/authmiddleWare.js';

router.get('/get', verifyFirebaseToken, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.uid });
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// // Add Category
router.post('/add', verifyFirebaseToken, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'All fields (question, answer, category) are required.' });
  }

  const newCategory = new Category({
    name,
    userId: req.user.uid
  });

  try {
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    console.error('Error saving category:', error);
    res.status(500).json({ message: 'Error saving category' });
  }
});

export default router;
